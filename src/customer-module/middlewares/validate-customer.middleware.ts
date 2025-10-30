// how middleware works in nestjs

import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { StatusMessage } from "src/dtos/StatusMessage.dto";
import { customers } from "src/static/customers";

@Injectable()
export class validateCustomerMiddleware implements NestMiddleware {
    use(req: Request, res: Response<StatusMessage>, next: NextFunction) {
        // validate headers.
        const { somekey } = req.headers;
        console.log("somekey value ", somekey);
        if (!somekey || somekey !== '1234') {
            // res.status(400).send("UnAuthorized");
            return res.status(400).send({
                status: "Failed",
                message: "UnAuthorized User",
                data: null
            });
        }
        const { body: {customerEmail, username} } = req;
        // validate unique constraints 
        const emailExists = customers.find(customer => customer.customerEmail === customerEmail);
        console.log("does the email exist", !!emailExists);
        if (emailExists) {
            return res.status(400).send({
                status: "Failed",
                message: "Error email already exists",
                data: null
            });
        }
        next();     
    }
}