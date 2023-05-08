import { GetAllUserResponseType } from './../../../utils/types';
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Inject, NotFoundException, Param, ParseBoolPipe, ParseIntPipe, Post, Put, Query, Req, Res, UseFilters, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiCreatedResponse, ApiBody, ApiParam, ApiOkResponse, ApiNotFoundResponse, ApiHeader} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';
import { LoginUserDto } from 'src/users/dtos/LoginUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
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
    @UseInterceptors(ClassSerializerInterceptor) // to serialize data using interceptors
    @ApiOperation({summary: 'Get all users'})
    @ApiHeader({
        name: 'authorization',
        description: 'authorization',
        schema: {
          type: 'string',
        },
    })
    @ApiOkResponse({type: GetAllUserResponseType, description: "Get all users successfully"})
    @UseGuards(AuthGuard)
    async getUsers(@Query('sortDesc', ParseBoolPipe) sortDesc: boolean){
        // return this.userService.fetchUsers()
        const users = await this.userService.fetchUsers();
        console.log(users);
        if(users.length){
            return users.map(user=> new SerializedUser(user))
        }
        return users;
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
    @UseInterceptors(ClassSerializerInterceptor) // to serialize data using interceptors
    @UsePipes(new ValidationPipe())
    @ApiOperation({summary: 'Create user'})
    @ApiBody({type: CreateUserDto})
    @ApiCreatedResponse({description: 'Create user successfully', type: GetAllUserResponseType})
    async createUser(@Body() userData: CreateUserDto){
        let user = await this.userService.createUser(userData);
        return new SerializedUser(user)
    }

    @Put(':id')
    @ApiOperation({summary: 'Update user by ID'})
    @ApiParam({name: 'id', type: 'number', description: 'ID of user'})
    updateUserById(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto){
        this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete user by id'})
    @ApiParam({name: 'id', type: 'number', description: 'ID of user'})
    async deleteUserById(@Param('id', ParseIntPipe) id: number){
        await this.userService.deleteUser(id)
    }

    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor) // to serialize data using interceptors
    @UseFilters(HttpExceptionFilters)
    @ApiOperation({summary: 'Get user by id'})
    @ApiParam({name: 'id', type: 'number', description: 'ID of user'})
    async getUserById(@Param('id', ParseIntPipe) id: number){
        const user = await this.userService.getUserById(id);
        if(!user){
            // throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
            throw new UserNotFoundException(); // custom exception
        }
        return new SerializedUser(user);
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

    @Post(':id/profiles')
    @UsePipes(new ValidationPipe())
    @ApiOperation({summary: 'Create user profile'})
    createUserProfile(@Param('id', ParseIntPipe) id: number, @Body() createUserProfileDto: CreateUserProfileDto){
        return this.userService.createUserProfile(createUserProfileDto, id)
    }

    @Post(':id/posts')
    @UsePipes(new ValidationPipe())
    @ApiOperation({summary: 'Create user post'})
    createUserPost(@Param('id', ParseIntPipe) id: number, @Body() createUserPostDto: CreateUserPostDto){
        return this.userService.createUserPost(id, createUserPostDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    login(@Body() userCredentials: LoginUserDto){
        return this.userService.login(userCredentials.username, userCredentials.password);
    }
}
