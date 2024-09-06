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
import { FindOneUserDto } from './dto/find-one-user.dto';

@Controller()
export class AppController {
  constructor(
    @Inject(SERVICE_NAME) private client: ClientKafka,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  @MessagePattern('user')
  async getUser(@Payload() findOneUserDto: FindOneUserDto) {
    try {
      const response = await this.userRepository.findOne({
        where: { id: findOneUserDto.id },
      });
      return JSON.stringify(response);
    } catch (error) {
      console.log('Error en getUser: ', error);
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }

  @MessagePattern('user.register.user')
  async registerUser(@Payload() userRegisterDto: UserRegisterDto) {
    const oldUser = await this.userRepository.findOneBy({
      email: userRegisterDto.email,
    });

    if (oldUser) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'User is registered',
      });
    }

    console.log('Registro de usuario: ', userRegisterDto);
    return this.userRepository.save(userRegisterDto);
  }
}
