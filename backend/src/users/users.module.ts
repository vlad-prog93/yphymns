import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from 'src/users/users.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
    forwardRef(() => MailModule)
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
