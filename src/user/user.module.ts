import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { Post } from 'src/post/entities/post.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Post])
  ],
  controllers: [UserController],
  providers: [UserService,JwtService,EmailService],
})
export class UserModule {}
