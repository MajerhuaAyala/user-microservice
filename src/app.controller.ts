import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('FIBO_SERVICE') private client: ClientKafka) {}

  @MessagePattern('user')
  getUser() {
    console.log('peticion a user');
    return 'Marcelino Majerhua Ayala';
  }
}
