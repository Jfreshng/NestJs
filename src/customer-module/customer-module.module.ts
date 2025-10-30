import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CustomersController } from './controllers/customers/customers.controller';
import { CustomersService } from './services/customers/customers.service';
import { validateCustomerMiddleware } from './middlewares/validate-customer.middleware';
import { ValidateExpiredCustomerMiddleware } from './middlewares/validate-expired-customer.middleware';
import { ValidateCustomerAccountMiddleware } from './middlewares/validate-customer-account.middleware';
import { NextFunction, Request, Response } from 'express';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomerModuleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      validateCustomerMiddleware, 
      ValidateExpiredCustomerMiddleware, 
      ValidateCustomerAccountMiddleware, 
      (req: Request, res: Response, next: NextFunction) => {
        res.send("About to call the last middleWare");
        next();
      }
    )
    .exclude(
      {
        path: 'customers/search/:id',
        method: RequestMethod.GET,
      },
    )
    .forRoutes(
      {
        path: 'customers/create',
        method: RequestMethod.POST,
      }
  )
  }
}
