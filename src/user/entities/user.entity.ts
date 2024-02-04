import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    avatar: string;

    @Column({ type: 'simple-array', default: []})
    followers: string[];

    @Column({ type: 'simple-array', default: []})
    following: string[];
    
    @OneToMany(() => Post, post => post.user)
    posts: Post[];
}
