import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsNumberString, ValidateNested } from "class-validator";
import { CreateAddressDto } from "../dtos/CreateAddress.dto";

export class Customer {
    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsNumberString()
    id: string

    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({required: true})
    @IsNotEmpty()
    name: string

    @ApiProperty({required: true})
    @ValidateNested()
    @IsNotEmptyObject()
    @Type(() => CreateAddressDto)
    address: CreateAddressDto;
}