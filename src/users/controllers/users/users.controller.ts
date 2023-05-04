import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, ParseBoolPipe, ParseIntPipe, Post, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiCreatedResponse, ApiBody, ApiParam} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {

    // constructor(private userService: UsersService){

    // }

    constructor(@Inject("USER_SERVICE") private readonly userService: UsersService){

    }

    @Get()
    @UseGuards(AuthGuard)
    getUsers(@Query('sortDesc', ParseBoolPipe) sortDesc: boolean){
        return this.userService.fetchUsers()
    }

    // in using express way
    @Post()
    createUserExpress(@Req() request: Request, @Res() response: Response){
        console.log(request.body)
        response.send("hello it is created");
    }

    // in using nestjs way
    @Post('create')
    @UsePipes(new ValidationPipe())
    @ApiOperation({summary: 'Create user'})
    @ApiBody({type: CreateUserDto})
    @ApiCreatedResponse({description: 'Create user successfully', type: CreateUserDto})
    createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto){
        return this.userService.createUser(userData)
    }

    @Get(':id')
    @ApiOperation({summary: 'Get user by id'})
    @ApiParam({name: 'id', type: 'number', description: 'id of user'})
    getUserById(@Param('id', ParseIntPipe) id: number){
        const user = this.userService.getUserById(id);
        if(!user){
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }
        return user
    }
}
