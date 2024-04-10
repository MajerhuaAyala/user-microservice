import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ProductsService');

  async onModuleInit() {
    await this.$connect()
    this.logger.log('Database connected');
  }
  create(createUserDto: CreateUserDto) {
    try {
      console.log({createUserDto})
      return this.user.create({
        data: createUserDto,
      });
   
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Check logs',
      });
    }
  }

  findAll() {
    return `This action returns all users v2`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
