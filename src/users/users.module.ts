import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { UsersMiddleware } from './middlewares/users/users.middleware';
import { NextFunction, Request, Response } from 'express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/entities/User.entity';
import { ProfileRepository } from 'src/entities/Profile.entity';
import { PostRepository } from 'src/entities/Posts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, ProfileRepository, PostRepository])],
  controllers: [UsersController],
  // providers: [UsersService]
  providers: [
    {
      provide: 'USER_SERVICE',
      useClass: UsersService
    }
  ]
})
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(UsersMiddleware)
    //   .forRoutes(UsersController)
    consumer.apply(
      UsersMiddleware,
      (req: Request, res: Response, next: NextFunction) => {
        console.log("Last Middleware");
        next();
      }
    )
      .exclude(
        {
          path: 'users/:id',
          method: RequestMethod.GET
        }
      )
      .forRoutes(
        // {
        //   path: 'users',
        //   method: RequestMethod.GET
        // },
        // {
        //   path: 'users/:id',
        //   method: RequestMethod.GET
        // }
        UsersController
      )
    .apply((req: Request, res: Response, next: NextFunction) => {
      console.log("Really last middleware");
      next()
      // next();
    })
      .forRoutes({
          path: 'users/:id',
          method: RequestMethod.GET
      })
  }
}
