import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/user/create-user.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private authService: AuthService
    ) {}

    @Post('signup')
    async register( @Body() createUserDto: CreateUserDto ) {
        return await this.userService.create(createUserDto);
    }

    @Post('login')
    async login( @Body() createUserDto: CreateUserDto ) {
        return await this.authService.login(createUserDto);
    }

}
