import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRepository } from "./User.entity";

@Entity({name: 'user_posts'})
export class PostRepository{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @ManyToOne(() => UserRepository, (user) => user.posts)
    user: UserRepository
}