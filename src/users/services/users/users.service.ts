import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { SerializedUser, User } from 'src/users/types/User';
import { CreateUserType } from 'src/utils/types';

@Injectable()
export class UsersService {
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

    fetchUsers(){
        // return this.fakeUsers;
        return this.fakeUsers.map(user => plainToClass(SerializedUser, user))
    }

    createUser(userDetails: CreateUserType){
        this.fakeUsers.push(userDetails);
        return this.fakeUsers;
    }

    getUserById(id: number){
        return null
        return {id: 1, username: 'Anson', email: 'anson@gmail.com'}
    }

    getUserByUsername(username: string){
        const user = this.fakeUsers.find(user => user.username === username)
        // return plainToClass(SerializedUser, user);
        return user;
    }
}
