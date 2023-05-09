import { GetAllUserResponseType, LoginUserSuccessfulType, LoginUserUnsuccessfulType } from './../../../utils/types';
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Inject, NotFoundException, Param, ParseBoolPipe, ParseIntPipe, Post, Put, Query, Req, Res, UseFilters, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiCreatedResponse, ApiBody, ApiParam, ApiOkResponse, ApiNotFoundResponse, ApiHeader, ApiUnauthorizedResponse} from '@nestjs/swagger';
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
import { SerializedUser, SerializedUserType, User } from 'src/users/types/User';

@ApiTags('users')
@Controller('users')
export class UsersController {

    // constructor(private userService: UsersService){

    // }

    // Inject the UserService dependency into the controller
    constructor(@Inject("USER_SERVICE") private readonly userService: UsersService){

    }

    // Define a GET route to fetch all users
    // Endpoint: /api/users
    @Get()
    @UseInterceptors(ClassSerializerInterceptor) // Use interceptor to serialize data
    @ApiOperation({summary: 'Get all users'}) // API documentation for this endpoint
    @ApiHeader({ // Specify the authorization header required for this endpoint
        name: 'authorization',
        description: 'authorization',
        schema: {
          type: 'string',
        },
    })
    @ApiOkResponse({type: GetAllUserResponseType, description: "Get all users successfully"}) // Specify the response schema
    @UseGuards(AuthGuard) // Use the AuthGuard to protect this route
    async getUsers(@Query('sortDesc', ParseBoolPipe) sortDesc: boolean){

        // Call the fetchUsers method from the userService
        const users = await this.userService.fetchUsers();

        // Log the fetched users to the console
        console.log(users);

        // If users are found, return them in a serialized format
        if(users.length){
            return users.map(user=> new SerializedUser(user))
        }

        // If no users are found, return an empty array
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

    // This route handles POST requests to create a new user
    @Post('create')
    // Use the ClassSerializerInterceptor to serialize data returned from the API
    @UseInterceptors(ClassSerializerInterceptor)
    // Use the ValidationPipe to validate the incoming request data
    @UsePipes(new ValidationPipe())
    // Set the API operation metadata
    @ApiOperation({summary: 'Create user'})
    // Set the API request body parameter metadata
    @ApiBody({type: CreateUserDto})
    // Set the API response metadata
    @ApiCreatedResponse({description: 'Create user successfully', type: GetAllUserResponseType})
    // Async function to create a new user
    async createUser(
        // This decorator extracts the request body and maps it to an instance of CreaeUserDto.
        @Body() userData: CreateUserDto
    ){

        // Call the createUser method from the userService to create a new user
        let user = await this.userService.createUser(userData);

        // Return the new user in a serialized format using the SerializedUser class
        return new SerializedUser(user)
    }

    // This route handles PUT requests to update a user by their ID.
    @Put(':id')
    // Use the ValidationPipe to validate the incoming request data
    @UsePipes(new ValidationPipe())
    // Set the API operation metadata
    @ApiOperation({summary: 'Update user by ID'})
    // This decorator adds a parameter to the route for the user ID.
    @ApiParam({name: 'id', type: 'number', description: 'ID of user'})
    updateUserById(
        // This decorator extracts the ID from the request URL and ensures it's a valid number.
        @Param('id', ParseIntPipe) id: number, 

        // This decorator extracts the request body and maps it to an instance of UpdateUserDto.
        @Body() updateUserDto: UpdateUserDto
    ) {
      // This method calls the user service to update the user with the given ID.
      this.userService.updateUser(id, updateUserDto);
    }

    // Define a route to delete a user by ID => endpoint : /api/users/:id
    @Delete(':id')
    // Set the API operation metadata
    @ApiOperation({summary: 'Delete user by ID'})
    // This decorator adds a parameter to the route for the user ID.
    @ApiParam({name: 'id', type: 'number', description: 'ID of user'})
    async deleteUserById(
        // This decorator extracts the ID from the request URL and ensures it's a valid number.
        @Param('id', ParseIntPipe) id: number
    ){

        // Call the deleteUser method from the userService to delete the user by ID
        await this.userService.deleteUser(id)
    }

    // @Get(':id')
    // @UseInterceptors(ClassSerializerInterceptor) 
    // @UseFilters(HttpExceptionFilters)
    // @ApiOperation({summary: 'Get user by id'})
    // @ApiOkResponse({type: SerializedUserType, description: "User with specified id was found"})
    // @ApiParam({name: 'id', type: 'number', description: 'ID of user'})
    // async getUserById(@Param('id', ParseIntPipe) id: number){
    //     const user = await this.userService.getUserById(id);
    //     if(!user){
    //         // throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    //         throw new UserNotFoundException();
    //     }
    //     return new SerializedUser(user);
    // }

    // Define a route to get a user by ID => endpoint : /api/users/:id
    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor) // Serialize the data using interceptors
    @UseFilters(HttpExceptionFilters) // Handle HTTP exceptions with filters
    @ApiOperation({summary: 'Get user by ID'}) // Set the description for the API endpoint
    @ApiOkResponse({type: SerializedUserType, description: "User with specified ID was found"}) // Define the response schema
    @ApiParam({name: 'id', type: 'number', description: 'ID of user'}) // Define the parameter schema
    async getUserById(@Param('id', ParseIntPipe) id: number){

        // Call the getUserById method from the userService
        const user = await this.userService.getUserById(id);

        // If no user is found, throw a custom UserNotFoundException
        if(!user){
            // throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
            throw new UserNotFoundException();
        }

        // Return the user in a serialized format
        return new SerializedUser(user);
    }

    @Get('/username/:username')
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({summary: 'Get user by username'})
    @ApiParam({name: 'username', type: 'string', description: 'username of user'})
    @ApiOkResponse({type: SerializedUserType, description: "User with specified username was found"})
    @ApiNotFoundResponse({description: "User with specified username was not found"})
    async getUserByUsername(@Param('username') username: string){
        const user = await this.userService.getUserByUsername(username);
        if(user){
            return new SerializedUser(user);
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
    @ApiOperation({summary: 'Login user'})
    @ApiOkResponse({type: LoginUserSuccessfulType, description: "User login successfully"})
    @ApiUnauthorizedResponse({type: LoginUserUnsuccessfulType, description: "Unauthorized"})
    login(@Body() userCredentials: LoginUserDto){
        return this.userService.login(userCredentials.username, userCredentials.password);
    }
}
