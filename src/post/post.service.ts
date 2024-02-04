import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    ) { }

    createPost(createPostDto: any, id: any, originalname: any, buffer: any) {
        return {
            message: "Post created successfully",
            data: {
                ...createPostDto,
                madeById: id,
                originalname: originalname,
            }
        }
    }

}
