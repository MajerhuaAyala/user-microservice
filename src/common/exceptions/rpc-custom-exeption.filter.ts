import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(HttpException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('Exception: ', exception.getResponse());

    throw new RpcException({
      status: exception.getStatus() || HttpStatus.BAD_REQUEST,
      message: exception.getResponse(),
    });
  }
}
