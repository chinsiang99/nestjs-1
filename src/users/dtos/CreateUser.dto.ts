import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsAlphanumeric()
    username: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({required: true})
    @IsNotEmpty()
    age: number
}