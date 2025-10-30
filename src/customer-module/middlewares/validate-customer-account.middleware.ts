import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { StatusMessage } from "src/dtos/StatusMessage.dto";
import { customers } from "src/static/customers";

@Injectable()
export class ValidateCustomerAccountMiddleware implements NestMiddleware{
    use(req: Request, res: Response<StatusMessage>, next: NextFunction){
        // validate headers
        console.log("validating account...");
        const { body: {
            account, customerName
        } } = req;
        if (account) {
            const accountExists = customers.find(customer => customer.customerPhone === account)
            if (accountExists) return res.status(400).send({
                status: "Failed",
                message: "Account is already in use, kindly confirm",
                data: null
            })
        }
        next();
    }
}