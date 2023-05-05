import { Customer } from './../../types/Customer';
import { Controller, Get, Inject, Param, ParseIntPipe, HttpException, HttpStatus, NotFoundException, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCutomer.dto';
import { CustomersService } from 'src/customers/services/customers/customers.service';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {

    // constructor(private customersService: CustomersService){

    // }

    constructor(@Inject("CUSTOMER_SERVICE") private readonly customersService: CustomersService){

    }

    @Get('')
    @ApiOperation({summary: 'Get customers'})
    @ApiOkResponse({type: Customer, isArray: true, description: 'The customer with the specified ID was retrieved successfully'})
    @ApiNotFoundResponse({description: "There is currently no customer in the record"})
    getCustomers(){
        const customers = this.customersService.getAllCustomer();
        if(customers){
            return customers;
        }else{
            throw new HttpException("There is currently no customer in the record", HttpStatus.NOT_FOUND);
        }
    }

    @Get(':id')
    @ApiOperation({summary: 'Get customer by ID'})
    @ApiParam({name: 'id', type: 'number', description: 'The ID of the customer to retrieve'})
    @ApiOkResponse({type: Customer, description: 'The customer with the specified ID was retrieved successfully'})
    @ApiNotFoundResponse({description: "Customer with specified id is not found"})
    getCustomerById(@Param('id', ParseIntPipe) id: number){
        // console.log(!![]);
        const customer =  this.customersService.getCustomerById(id.toString());
        if(customer){
            return customer
        }else{
            // throw new HttpException('Customer not Found!', HttpStatus.BAD_REQUEST);
            throw new NotFoundException(`Customer with id: ${id} is not found!`)
        }
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    @ApiOperation({summary: 'Create new customer'})
    @ApiBody({type: CreateCustomerDto})
    @ApiCreatedResponse({type: Customer, description: "The customer was created successfully"})
    createCustomer(@Body() createCustomerDto: CreateCustomerDto){
        console.log(createCustomerDto)
        this.customersService.createCustomer(createCustomerDto);
    }
}
