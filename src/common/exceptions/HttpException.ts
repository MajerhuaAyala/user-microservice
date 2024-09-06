import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

type ErrorToDto = {
  message: string[];
  error: string;
  statusCode: number;
};

@Catch(HttpException)
export class HttpCustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const error = exception.getResponse();
    const errorToDto: ErrorToDto = JSON.parse(JSON.stringify(error));
    if (errorToDto?.message) {
      const code = errorToDto?.statusCode;
      const message = errorToDto?.message;
      throw new RpcException({
        code,
        message,
      });
    }
    return response;
  }
}
