import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { StatusMessage } from "src/dtos/StatusMessage.dto";

@Injectable()
export class ValidateExpiredCustomerMiddleware implements NestMiddleware {
    use(req: Request, res: Response<StatusMessage>, next: NextFunction) {

        // validate customers:
        const validDate = new Date('2025-09-01');
        const { body: { validityDate }} = req;
        const parsedDate = new Date(validityDate);
        if (parsedDate > validDate) {
            return res.status(400).send({
                status: "Failed",
                message: "Invalid date",
                data: null
            })
        }
        next();
    }
}

