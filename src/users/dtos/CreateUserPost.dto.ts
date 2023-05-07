import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserPostDto {
    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsAlphanumeric()
    title: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsNumber()
    userId: number

    // @ApiProperty({required: true})
    // @IsNotEmpty()
    // age: number
}