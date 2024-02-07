import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('all')
  @UseGuards(AuthGuard)
  findAll(@Req() req: any) {
    return this.userService.findAll();
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('profile')
  @CacheTTL(10)
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

  @UseInterceptors(CacheInterceptor)
  @CacheKey('feed')
  @CacheTTL(10)
  @Get('feed')
  @UseGuards(AuthGuard)
  feed(@Req() req: any) {
    return this.userService.feed(req.user.id);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('search')
  @CacheTTL(10)
  @Get('/search/feed')
  @UseGuards(AuthGuard)
  seacrhFeed(@Req() req: any) {
    return this.userService.randomFeed();
  }
  
}
