import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({
      ...createUserDto,
      followers: [],
      following: [],
    });

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({
      relations: ['posts'],
    })
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  profile(id: string) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
  }

  async following(id: string, followId: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    const follow = await this.userRepository.findOne({
      where: { id: followId },
    });

    user.following.push(followId);
    follow.followers.push(id);

    await this.userRepository.save(user);
    await this.userRepository.save(follow);

    return {
      user, follow
    };
  }

  async unFollowing(id: string, unfollowId: string) {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { id },
      });
      const follow = await this.userRepository.findOneOrFail({
        where: { id: unfollowId },
      });

      user.following = user.following.filter((id) => id !== unfollowId);
      follow.followers = follow.followers.filter((id) => id !== id);
      
      await this.userRepository.save(user);
      await this.userRepository.save(follow);

      return { user, follow };
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

}
