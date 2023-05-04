import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Inside the middleware now")
    
    const {authorization} = req.headers;
    
    if(!authorization){
      throw new HttpException('No Authorization Found', HttpStatus.FORBIDDEN)
    }

    if(authorization){
      console.log(req.headers.authorization);
    }
    next();
  }
}
