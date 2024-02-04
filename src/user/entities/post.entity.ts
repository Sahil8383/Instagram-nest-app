import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Comment } from "./comment.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: string;
    
    @Column({ unique: true })
    title: string;

    @Column({ nullable: true })
    image: string;

    @Column({ default: 0 })
    likes: number;

    @Column({ default: 0 })
    dislikes: number;

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: "userId" })
    user: User;

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];
}
