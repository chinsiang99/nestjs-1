import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserProfileDto {
    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsString()
    lastName: string

    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsNumber()
    age: number

    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsString()
    dob: string

    // @ApiProperty({required: true})
    // @IsNotEmpty()
    // age: number
}