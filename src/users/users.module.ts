import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { UsersMiddleware } from './middlewares/users/users.middleware';

@Module({
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
    consumer.apply(UsersMiddleware)
      .forRoutes(
        {
          path: 'users',
          method: RequestMethod.GET
        },
        {
          path: 'users/:id',
          method: RequestMethod.GET
        }
      )
  }
}
