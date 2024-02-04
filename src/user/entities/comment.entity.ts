import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Post } from "./post.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: string;
    
    @Column()
    content: string;

    @Column({ default: 0 })
    likes: number;

    @Column({ default: 0 })
    dislikes: number;

    @ManyToOne(() => Post, post => post.comments)
    @JoinColumn({ name: "postId" })
    post: Post;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: "madeById" })
    madeBy: User;
}
