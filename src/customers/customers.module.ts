import { Module } from '@nestjs/common';
import { CustomersController } from './controller/customers/customers.controller';
import { CustomersService } from './services/customers/customers.service';

@Module({
  controllers: [CustomersController],
//   providers: [CustomersService]
  providers: [
    {
        provide: 'CUSTOMER_SERVICE',
        useClass: CustomersService
    }
  ]
})
export class CustomersModule {}
