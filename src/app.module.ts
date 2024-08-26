import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FIBO_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'app-consumer',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'kafka-microservices',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}
