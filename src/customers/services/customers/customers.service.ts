import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCutomer.dto';
import { Customer } from 'src/customers/types/Customer';

@Injectable()
export class CustomersService {

    private customers: Customer[] = [
        {
            id: "1",
            email: "chinsiang99@gmail.com",
            name: "chinsiang",
            address: {
                line1: "61, jalan mega 1",
                line2: "Taman",
                zip: "56100",
                city: "Kuala Lumpur",
                state: "Kuala Lumpur",
            }
        },
        {
            id: "2",
            email: "jimmy@gmail.com",
            name: "jimmy",
            address: {
                line1: "61, jalan mega 1",
                line2: "Taman",
                zip: "56100",
                city: "Kuala Lumpur",
                state: "Kuala Lumpur",
            }
        },
        {
            id: "3",
            email: "angie@gmail.com",
            name: "angie",
            address: {
                line1: "61, jalan mega 1",
                line2: "Taman",
                zip: "56100",
                city: "Kuala Lumpur",
                state: "Kuala Lumpur",
            }
        }
    ]

    getAllCustomer(){
        return this.customers
    }

    getCustomerById(id: string){
        return this.customers.find(customer => customer.id === id)
    }

    createCustomer(customerDto: CreateCustomerDto){
        this.customers.push(customerDto);
    }
}
