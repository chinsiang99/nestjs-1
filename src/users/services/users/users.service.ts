import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserType } from 'src/utils/types';

@Injectable()
export class UsersService {
    private fakeUsers = [
        {
            username: "Anson", 
            email: 'anson@anson.com'
        }
    ];

    fetchUsers(): object{
        return this.fakeUsers;
    }

    createUser(userDetails: CreateUserType){
        return this.fakeUsers.push(userDetails);
    }

    getUserById(id: number){
        return null
        return {id: 1, username: 'Anson', email: 'anson@gmail.com'}
    }
}
