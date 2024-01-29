import { CreatePostDto } from "../post/create-post.dto";


export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    followers?: number;
    following?: number;
    posts?: CreatePostDto[];
}
