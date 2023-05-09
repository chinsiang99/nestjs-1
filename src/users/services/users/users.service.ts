import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { PostRepository } from 'src/entities/Posts.entity';
import { ProfileRepository } from 'src/entities/Profile.entity';
import { UserRepository } from 'src/entities/User.entity';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { SerializedUser, User } from 'src/users/types/User';
import { comparePassword, hashPassword } from 'src/utils/bcrypt';
import { CreateUserType, UpdateUserType, CreateUserProfileType, CreateUserPostType } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserRepository) private userReposiroty: Repository<UserRepository>,
        @InjectRepository(ProfileRepository) private profileRepository: Repository<ProfileRepository>,
        @InjectRepository(PostRepository) private postRepository: Repository<PostRepository>
    ){

    }

    private fakeUsers: User[] = [
        {
            username: "Anson", 
            email: 'anson@anson.com',
            password: "125"
        },
        {
            username: "chinsiang", 
            email: 'anson@anson.com',
            password: "125"
        },
        {
            username: "jimmy", 
            email: 'anson@anson.com',
            password: "125"
        }
    ];

    async fetchUsers(){
        // return this.fakeUsers;
        // return this.fakeUsers.map(user => plainToClass(SerializedUser, user))
        // return this.userReposiroty.find(); // this has no relation, so it will not give back profile id related data
        return this.userReposiroty.find();
        // return this.userReposiroty.find({relations: ['profile', 'posts']}); // in order o have nested relations
    }

    async createUser(userDetails: CreateUserType){
        const password = hashPassword(userDetails.password);
        const newUser = this.userReposiroty.create({
            ...userDetails, password, createdAt: new Date()
        })
        return await this.userReposiroty.save(newUser);
        // this.fakeUsers.push(userDetails);
        // return this.fakeUsers;
    }

    getUserById(id: number){
        return this.userReposiroty.findOneBy({id: id})
    }

    getUserByUsername(username: string){
        const user = this.userReposiroty.findOneBy({username: username})
        // const user = this.fakeUsers.find(user => user.username === username)
        // return plainToClass(SerializedUser, user);
        return user;
    }

    async updateUser(id: number, userDetails: UpdateUserType){
        try{
            const update = await this.userReposiroty.update({id}, {...userDetails})
            return update
        }catch(err){
            console.log(err)
            console.log("Please, i could not update successfully");
        }
        
        // console.log(update)
        // if(!update){
        //     console.log("Please, i could not update successfully");
        // }
        // return update;
    }

    async deleteUser(id: number){
        try{
            this.userReposiroty.delete({id})
        }catch(err){
            console.log(err)
            console.log("Please, i could not delete successfully");
        }
    }

    async createUserProfile(createUserProfileDetails: CreateUserProfileType, id: number){
        const user = await this.userReposiroty.findOneBy({id});
        if(!user){
            throw new HttpException('User not found, cannot create profile', HttpStatus.BAD_REQUEST);
        }
        console.log(user)
        const newProfile = this.profileRepository.create(createUserProfileDetails);
        const savedProfile = await this.profileRepository.save(newProfile);
        console.log(savedProfile);
        user.profile = savedProfile;
        return this.userReposiroty.save(user);
    }

    async createUserPost(id: number, createUserPostDetails: CreateUserPostType){
        try{
            const user = await this.userReposiroty.findOneBy({id});
            if(!user){
                throw new HttpException('User not found, cannot create post', HttpStatus.BAD_REQUEST);
            }
            console.log(user)
            const newPost = this.postRepository.create({
                ...createUserPostDetails,
                user
            });
            const savedPost = await this.postRepository.save(newPost)
            return savedPost
        }catch(err){
            console.log("there is something wrong!")
        }

    }

    async login(username: string, password: string){
        const userDB = await this.userReposiroty.findOneBy({username});
        if(userDB){
            let result = comparePassword(password, userDB.password)
            if(result){
                console.log("Password is matched");
                return ({
                    status: 200,
                    message: "Login successfully"
                })
            }
            console.log("Login failed");
            // throw new HttpException("Password does not match", HttpStatus.FORBIDDEN);
            throw new UnauthorizedException("Password does not match");
        }else{
            throw new UnauthorizedException("User not found");
        }
    }
}
