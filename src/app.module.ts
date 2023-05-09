import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './entities/User.entity';
import { ProfileRepository } from './entities/Profile.entity';
import { PostRepository } from './entities/Posts.entity';
import entities from './entities/index.entity';

@Module({
  imports: [
    UsersModule, 
    CustomersModule, 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Siang091',
      database: 'nestjs_mysql',
      // entities: [UserRepository, ProfileRepository, PostRepository],
      entities: entities,
      synchronize: false // to see whether need to synchronize with the database or not, normally put false
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
