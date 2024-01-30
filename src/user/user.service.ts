import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user/create-user.dto';
import { UpdateUserDto } from './dto/user/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {

  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow<string>('AWS_REGION'),
    credentials: {
      accessKeyId: this.configService.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.getOrThrow<string>('AWS_SECRET_ACCESS_KEY'),
    }
  })

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private readonly configService: ConfigService,
  ) { }

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async createPost(createPostDto: any, userId: number, originalname: string, buffer: Buffer) {
    const uploadedFile = await this.s3Client.send(new PutObjectCommand({
      Bucket: this.configService.getOrThrow<string>('AWS_BUCKET_NAME'),
      Key: originalname,
      Body: buffer,
    }))
    const cloudFrontUrl = await this.configService.getOrThrow<string>('CLOUD_FRONT');
    return this.postRepository.save({
      ...createPostDto,
      image: `${cloudFrontUrl}/${originalname}`,
      user: userId,
    });
  }

  findAll() {
    return this.userRepository.find({
      relations: ['posts', 'followers', 'following'],
    })
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async following(id: number, followId: number) {
    const followUser = await this.userRepository.findOne({
      where: { id: followId },
      relations: ['followers'],
    });
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['following'],
    });
    
    user.following.push(followUser);
    await this.userRepository.save(user);
    
    followUser.followers.push(user);
    await this.userRepository.save(followUser);

    return { message: 'Followed' };
  }

}
