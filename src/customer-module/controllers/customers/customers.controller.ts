import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customer-module/dtos/CreateCustomer.dto';
import { CustomersService } from 'src/customer-module/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService){

    }
    @Get('')
    getCustomers() {
        return this.customersService.findCustomer();
    }

    @Get(':id')
    getCustomerById(@Param('id') id: string) {
        return this.customersService.findCustomerByID(id);
    }

    @Get('/search/:id')
    searchCustomer(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.customersService.findCustomerByID(id);
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
        // using DTO
        // console.log(createCustomerDto);
        return this.customersService.createCustomer(createCustomerDto);
    }
}
