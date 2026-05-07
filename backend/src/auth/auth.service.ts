import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { LoginDTO } from 'src/auth/dto/login.dto';
import { User, UserDocument } from 'src/users/schemas/user.schema';

export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) { }

  async login({ email, password }: LoginDTO) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('Неправильный логин или пароль');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Неправильный логин или пароль');
    }

    const payload = { sub: user._id, email: user.email, role: user.role };

    const token = this.jwtService.sign(payload);

    return { token, user: { _id: user._id, email: user.email, role: user.role } };
  }
}