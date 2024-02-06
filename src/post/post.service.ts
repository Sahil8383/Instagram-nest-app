import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity'; 
import { Cloudinary } from 'src/cloudinary/cloudinary';

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        @InjectRepository(Comment) private commentRepository: Repository<Comment>,
        private cloudinary: Cloudinary
    ) { }

    async createPost(createPostDto: any, id: any, file: any) {
        const { url } = await this.cloudinary.uploadFile(file);
        const post = this.postRepository.create({ ...createPostDto, user: id , image: url });
        return this.postRepository.save(post);
    }

}
