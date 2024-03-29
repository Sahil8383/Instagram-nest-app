import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { JwtService } from '@nestjs/jwt';
import { Cloudinary } from 'src/cloudinary/cloudinary'; 


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post, Comment])
  ],
  controllers: [PostController],
  providers: [PostService, JwtService, Cloudinary]
})
export class PostModule {}
