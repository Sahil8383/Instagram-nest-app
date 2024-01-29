import { CreateCommentDto } from "../comment/create-comment.dto";
import { CreateUserDto } from "../user/create-user.dto";

export class CreatePostDto {
    title: string;
    image: string;
    likes?: number;
    dislikes?: number;
    user?: CreateUserDto;
    comments?: CreateCommentDto[];
}