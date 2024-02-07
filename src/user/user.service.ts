import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
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

  async profile(id: string) {

    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['posts'],
    });

    return {
      ...user,
      followers: user.followers.length,
      following: user.following.length,
    };
  }

  async feed(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    const followingArray = user.following;
    const posts = await this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.posts', 'post')
      .where('user.id IN (:...ids)', { ids: followingArray })
      .getMany();

    return posts;
  }

  async randomFeed() {
    
    const posts = await this.postRepository.createQueryBuilder('post')
      .orderBy("RANDOM()")
      .limit(10)
      .getMany();

    return posts;
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
