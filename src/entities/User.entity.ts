import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfileRepository } from "./Profile.entity";
import { PostRepository } from "./Posts.entity";

@Entity({name: 'users'})
export class UserRepository{
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number

    @Column({unique: true})
    username: string

    @Column({unique: true, name: 'email_address'})
    email: string

    @Column()
    password: string

    @Column()
    createdAt: Date

    @Column({nullable: true})
    authStrategy: string

    @OneToOne(()=> ProfileRepository)
    @JoinColumn()
    profile: ProfileRepository

    @OneToMany(() => PostRepository, (post) => post.user)
    posts: PostRepository[]
}