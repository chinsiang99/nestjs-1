import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger"
import { Exclude } from 'class-transformer';

export class User {
    @ApiProperty({required: true})
    @IsString()
    username: string

    @ApiProperty({required: true})
    @IsEmail()
    email: string

    @ApiProperty({required: true})
    @IsString()
    password: string
}

export class SerializedUserType{

    @ApiProperty({required: true})
    @IsString()
    username: string

    @ApiProperty({required: true})
    @IsString()
    id: string

    @ApiProperty({required: true})
    @IsEmail()
    email: string

    @ApiProperty({required: true})
    @IsString()
    createdAt: Date

    @ApiProperty({required: true})
    @IsString()
    authStrategy: string
}

export class SerializedUser{
    id: number

    username: string

    email: string

    @Exclude()
    password: string

    createdAt: Date

    authStrategy: string

    constructor(partial: Partial<SerializedUser>){
        Object.assign(this, partial)
    }
}