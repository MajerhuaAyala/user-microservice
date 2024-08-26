import { Controller, HttpStatus, Inject } from '@nestjs/common';
import {
  ClientKafka,
  MessagePattern,
  Payload,
  RpcException,
} from '@nestjs/microservices';
import { UserRegisterDto } from './dto/user-register.dto';

@Controller()
export class AppController {
  constructor(@Inject('ACTION_SERVICE') private client: ClientKafka) {}

  @MessagePattern('user')
  getUser() {
    console.log('peticion a user');
    return {
      id: 1,
      username: 'Marcelino',
      email: 'marcelino.majerhua@gmail.com',
      role: 'ADMIN',
    };
  }

  @MessagePattern('user.register.user')
  async registerUser(@Payload() userRegisterDto: UserRegisterDto) {
    try {
      console.log(`Registrando usuario: `, userRegisterDto);
      return userRegisterDto;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
