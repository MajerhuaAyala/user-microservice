import { Controller, HttpStatus, Inject } from '@nestjs/common';
import {
  ClientKafka,
  MessagePattern,
  Payload,
  RpcException,
} from '@nestjs/microservices';
import { UserRegisterDto } from './dto/user-register.dto';
import { SERVICE_NAME } from './config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    @Inject(SERVICE_NAME) private client: ClientKafka,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

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
      console.log('Registro de usuario: ', userRegisterDto);
      return this.userRepository.save(userRegisterDto);
    } catch (error) {
      console.error(error);
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
