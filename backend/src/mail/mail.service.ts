import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  async sendPassword(email: string, password: string) {
    console.log(`📨 Заглушка: письмо для ${email} с паролем ${password}`);
  }
}