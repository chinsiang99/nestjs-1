import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginUserDto {
    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsAlphanumeric()
    username: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsAlphanumeric()
    // @MinLength(10)
    password: string

    // @ApiProperty({required: true})
    // @IsNotEmpty()
    // age: number
}