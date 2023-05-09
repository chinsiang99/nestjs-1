import { ApiProperty } from "@nestjs/swagger"

export type CreateUserType = {
    username: string
    email: string
    password: string
}

export type UpdateUserType = {
    username: string
    email: string
    password: string
}

export type CreateUserProfileType = {
    firstName: string;
    lastName: string
    age: number
    dob: string
}

export type CreateUserPostType = {
    title: string
    description: string
    userId: number
}

export class GetAllUserResponseType {
    @ApiProperty()
    username: string

    @ApiProperty()
    email: string

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    authStrategy: string | null

    @ApiProperty()
    id: number
}

export class LoginUserSuccessfulType{
    @ApiProperty()
    status: 200
    
    @ApiProperty()
    message: "Login successfully"
}

export class LoginUserUnsuccessfulType{
    @ApiProperty()
    statusCode: 401

    @ApiProperty()
    message: "Password does not match"

    @ApiProperty()
    error: "Unauthorized"
}