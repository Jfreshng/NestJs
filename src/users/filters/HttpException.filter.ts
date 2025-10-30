import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        console.log("her is the exception", exception);
        console.log("her is the exception", exception.getResponse());
        console.log("her is the exception", exception.getStatus());
        // throw new Error('Method not implemented.');

        const context = host.switchToHttp();
        const request = context.getRequest<Request>();
        const response = context.getResponse<Response>();

        response.sendStatus(exception.getStatus());

    }
    
}