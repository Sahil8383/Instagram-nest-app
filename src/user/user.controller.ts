import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/user/update-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreatePostDto } from './dto/post/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @UseGuards(AuthGuard)
  findAll(@Req() req: any){
    return this.userService.findAll();
  }

  @Post('create/post')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File, @Body() createPostDto: CreatePostDto, @Req() req: any) {
    return this.userService.createPost(createPostDto, req.user.id, file.originalname, file.buffer);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
