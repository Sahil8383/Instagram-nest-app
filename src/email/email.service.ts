import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class EmailService {

  constructor(private readonly mailerService: MailerService) { }

  @OnEvent('user.welcome')
  async welcomeEmail(data: any) {
    const { email, name } = data;
    const subject = `Welcome to Company: ${name}`;
    await this.mailerService.sendMail({
      to: email,
      subject,
      template: join(process.cwd(), 'src' ,'email', 'templates', 'welcome'),
      context: {
        name,
      },
    });
  }


}
