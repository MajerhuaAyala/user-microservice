import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class HttpCustomExeptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    throw new RpcException(exception.getResponse());
  }
}
