import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { RegisterDTO } from 'src/users/dto/register.dto';

export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private mailService: MailService,

  ) { }

  private generatePassword(): string {
    return crypto.randomBytes(6).toString('hex'); // ~12 символов
  }

  async create({ email }: RegisterDTO) {
    const existing = await this.userModel.findOne({ email });

    if (existing) {
      throw new BadRequestException('Пользователь уже существует');
    }

    const plainPassword = this.generatePassword();

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const user: User = await this.userModel.create({
      email,
      password: hashedPassword,
    });

    // TODO: отправка email
    await this.mailService.sendPassword(email, plainPassword);

    return { user: { email, role: user.role }, message: 'Пользователь успешно создан, пароль отправлен на почту' };
  }

  async getAllUsers() {
    const users: UserDocument[] = await this.userModel.find({}).sort({ createdAt: -1 })
    return users.map(user => ({ _id: user._id.toString(), email: user.email, role: user.role }))
  }

  async deleteUser(id: string, currentUser: any) {
    if (currentUser.sub === id) {
      throw new ForbiddenException('Вы не можете удалить себя');
    }

    const user = await this.userModel.findByIdAndDelete(id).lean().exec();

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return { email: user.email, message: 'Пользователь удален' };
  }


  async getById(requestUser: any, id: string) {
    // если не админ и пытается получить не себя
    if (requestUser.role !== 'admin' && requestUser.sub !== id) {
      throw new ForbiddenException();
    }

    const user: UserDocument = await this.userModel.findById(id).select('-password');

    if (!user) {
      throw new Error('Пользователь не найден');
    }

    return { _id: user._id.toString(), email: user.email, role: user.role }
  }

  async resetPassword({ email }: RegisterDTO) {
    const user = await this.userModel.findOne({ email });

    // не раскрываем существует ли пользователь
    if (!user) {
      return { message: 'Если пользователь существует, пароль отправлен вам на почту' };
    }

    const newPassword = this.generatePassword();

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    // пока что выводим в консоль
    console.log('RESET PASSWORD:', newPassword);
    await this.mailService.sendPassword(email, newPassword);

    return { message: 'Если пользователь существует, пароль отправлен вам на почту' };
  }

  async getUserByEmail(email: string) {
    return await this.userModel.find({ email })
  }

  async createAdminIfNotExists() {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) return;

    const existing = await this.userModel.findOne({ email: adminEmail });
    if (existing) return;

    const hashed = await bcrypt.hash(adminPassword, 10);

    const admin = new this.userModel({
      email: adminEmail,
      password: hashed,
      role: 'admin',
    });

    await admin.save();
    console.log(`Администратор создан: ${adminEmail}`);
  }

}