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