import { User } from "src/user/entities/user.entity";
import { CreatePostDto } from "../post/create-post.dto";


export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    followers?: User[];
    following?: User[];
    posts?: CreatePostDto[];
}
