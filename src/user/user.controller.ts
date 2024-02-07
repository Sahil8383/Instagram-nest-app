import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('all')
  @UseGuards(AuthGuard)
  findAll(@Req() req: any) {
    return this.userService.findAll();
  }

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

  @Get('feed')
  @UseGuards(AuthGuard)
  feed(@Req() req: any) {
    return this.userService.feed(req.user.id);
  }
}
