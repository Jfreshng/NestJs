import { Injectable } from '@nestjs/common';
import { customers } from '../../../static/customers'
import { CreateCustomerDto } from '../../dtos/CreateCustomer.dto';

@Injectable()
export class CustomersService {
    findCustomer() {
        // return {
        //     email: 'scottsDebbs@gmail.com',
        //     createdAt: new Date()
        // }
        return {
            status: 200,
            message: "Success",
            data: customers
        }
    }

    findCustomerByID(id) {
        console.log(id);

        const customer = customers.find(customer => customer.customerId === Number(id))
        if (customer) {
            return {
                status: 200,
                message: "Success",
                data: customer
            }
        } else {
            return {
                status: 404,
                message: "Not Found",
                data: null
            }
        }
    }

    createCustomer(createCustomerDto : CreateCustomerDto){
        customers.push(createCustomerDto);
        // return the new record that was created
        const newCustomerId = customers.findIndex(customer => customer === createCustomerDto)
        return {
            status: 201,
            message: "Customer Successfully Created",
            data: customers[newCustomerId]
        };
    }
}
