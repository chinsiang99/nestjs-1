import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateAddressDto {
    @ApiProperty({required: true})
    @IsNotEmpty()
    line1: string

    @ApiProperty({required: false})
    line2: string

    @ApiProperty({required: true})
    @IsNotEmpty()
    zip: string

    @ApiProperty({required: true})
    @IsNotEmpty()
    city: string

    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsString()
    state: string
}