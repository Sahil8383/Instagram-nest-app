import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    avatar: string;

    @ManyToMany(() => User, user => user.followers)
    @JoinTable()
    following: User[];

    @ManyToMany(() => User, user => user.following)
    @JoinTable()
    followers: User[];

    @OneToMany(() => Post, post => post.user)
    posts: Post[];
}
