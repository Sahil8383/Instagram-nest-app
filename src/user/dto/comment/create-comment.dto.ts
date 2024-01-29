import { CreatePostDto } from "../post/create-post.dto";
import { CreateUserDto } from "../user/create-user.dto";


export class CreateCommentDto {
    content: string;
    likes?: number;
    dislikes?: number;
    user?: CreateUserDto;
    post?: CreatePostDto;
}