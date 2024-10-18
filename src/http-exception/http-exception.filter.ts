import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (status === 400 && this.isEmptyBody(request.body)) {
      response.status(400).json({
        statusCode: 400,
        message: 'Debe llenar todos los campos',
      });
    } else {
      response.status(status).json({
        statusCode: status,
        message: exception.message,
      });
    }
  }

  private isEmptyBody(body: any): boolean {
    return !body || Object.keys(body).length === 0;
  }
}
