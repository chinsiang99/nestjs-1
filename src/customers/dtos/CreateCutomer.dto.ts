import { IsString } from 'class-validator';
import { IsEmail, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { CreateAddressDto } from './CreateAddress.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class CreateCustomerDto{
    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsString()
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