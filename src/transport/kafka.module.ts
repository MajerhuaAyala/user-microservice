import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ACTION_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user-microservice-3a786a02-6d14-483b-ab88-2a2f22fe9695',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'group-user-microservice',
          },
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: 'ACTION_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user-microservice-3a786a02-6d14-483b-ab88-2a2f22fe9695',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'group-user-microservice',
          },
        },
      },
    ]),
  ],
})
export class KafkaModule {}
