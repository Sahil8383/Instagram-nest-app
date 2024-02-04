import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreatePostDto } from '../post/dto/post/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('all')
  @UseGuards(AuthGuard)
  findAll(@Req() req: any) {
    return this.userService.findAll();
  }

  // @Post('create/post')
  // @UseGuards(AuthGuard)
  // @UseInterceptors(FileInterceptor('file'))
  // create(@UploadedFile() file: Express.Multer.File, @Body() createPostDto: CreatePostDto, @Req() req: any) {
  //   return this.userService.createPost(createPostDto, req.user.id, file.originalname, file.buffer);
  // }

  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@Req() req: any) {
    return this.userService.profile(req.user.id);
  }

  @Post('follow')
  @UseGuards(AuthGuard)
  following(@Body() body: any, @Req() req: any) {
    return this.userService.following(req.user.id, body.followId);
  }

  @Post('unfollow')
  @UseGuards(AuthGuard)
  unfollowing(@Body() body: any, @Req() req: any) {
    return this.userService.unFollowing(req.user.id, body.unfollowId);
  }
}
