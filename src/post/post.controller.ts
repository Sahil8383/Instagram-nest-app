import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreatePostDto } from './dto/post/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    
    constructor(
        private readonly postService: PostService
    ) {}

    @Post('create')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    create(
        @UploadedFile() file: Express.Multer.File, 
        @Body() createPostDto: CreatePostDto, 
        @Req() req: any
    ){
        return this.postService.createPost(createPostDto, req.user.id, file);
    }
}
