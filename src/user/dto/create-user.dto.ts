import { CreatePostDto } from "../../post/dto/post/create-post.dto";

export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    followers?: string[];
    following?: string[];
    posts?: CreatePostDto[];
}
