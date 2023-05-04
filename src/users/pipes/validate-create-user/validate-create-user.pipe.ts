import { ArgumentMetadata, Injectable, PipeTransform, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    console.log("Inside validate create user pipe")
    console.log(value)
    console.log(metadata)

    const parseAgeToInt = parseInt(value.age.toString())
    if(isNaN(parseAgeToInt)){
      console.log(`${value.age} is not a number`)
      throw new HttpException('Invalid Data Type for property age. Expected number', HttpStatus.BAD_REQUEST)
    }

    console.log("Age is a number")

    // return value;
    return { ...value, age: parseAgeToInt}
  }
}
