import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, NotFoundException, Param, ParseBoolPipe, ParseIntPipe, Post, Query, Req, Res, UseFilters, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiCreatedResponse, ApiBody, ApiParam, ApiOkResponse, ApiNotFoundResponse} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { HttpExceptionFilters } from 'src/users/filters/HttpException.filter';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
// import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser, User } from 'src/users/types/User';

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
    // @Post('create')
    // @UsePipes(new ValidationPipe())
    // @ApiOperation({summary: 'Create user'})
    // @ApiBody({type: CreateUserDto})
    // @ApiCreatedResponse({description: 'Create user successfully', type: CreateUserDto})
    // createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto){
    //     return this.userService.createUser(userData)
    // }

    @Post('create')
    @UsePipes(new ValidationPipe())
    @ApiOperation({summary: 'Create user'})
    @ApiBody({type: CreateUserDto})
    @ApiCreatedResponse({description: 'Create user successfully', type: CreateUserDto})
    createUser(@Body() userData: CreateUserDto){
        return this.userService.createUser(userData)
    }

    @Get(':id')
    @UseFilters(HttpExceptionFilters)
    @ApiOperation({summary: 'Get user by id'})
    @ApiParam({name: 'id', type: 'number', description: 'id of user'})
    getUserById(@Param('id', ParseIntPipe) id: number){
        const user = this.userService.getUserById(id);
        if(!user){
            // throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
            throw new UserNotFoundException(); // custom exception
        }
        return user
    }

    @Get('/username/:username')
    @UseInterceptors(ClassSerializerInterceptor) // to serialize data using interceptors
    @ApiOperation({summary: 'Get user by username'})
    @ApiParam({name: 'username', type: 'string', description: 'username of user'})
    @ApiOkResponse({type: User, description: "User with specified username was found"})
    @ApiNotFoundResponse({description: "User with specified username was not found"})
    getUserByUsername(@Param('username') username: string){
        const user = this.userService.getUserByUsername(username);
        if(user){
            return new SerializedUser(user); // this is where to be serialized
        }else{
            throw new NotFoundException(`Username with ${username} is not found`);
        }
    }
}
