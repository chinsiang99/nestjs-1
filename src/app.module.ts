import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [UsersModule, CustomersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
