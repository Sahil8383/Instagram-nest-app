import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity'; 
import { Cloudinary } from 'src/cloudinary/cloudinary';
import { CreateCommentDto } from './dto/comment/create-comment.dto';

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        @InjectRepository(Comment) private commentRepository: Repository<Comment>,
        private cloudinary: Cloudinary
    ) { }
    
    async findOne(id: string) {
        return this.postRepository.findOne({
            where: { id },
            relations: ['comments', 'comments.madeBy']
        });
    }


    async createPost(createPostDto: any, id: any, file: any) {
        const { url } = await this.cloudinary.uploadFile(file);
        const post = this.postRepository.create({ ...createPostDto, user: id , image: url });
        return this.postRepository.save(post);
    }

    async comment(commentDto: CreateCommentDto) {
        const { post, user } = commentDto;
        const comment = this.commentRepository.create({
            ...commentDto,
            post: post,
            madeBy: user
        });
        return this.commentRepository.save(comment);
    }

}
