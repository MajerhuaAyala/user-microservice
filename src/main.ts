import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionFilter } from './common/exceptions/ExceptionFilter';
import { HttpCustomExceptionFilter } from './common/exceptions/HttpException';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: `consumer-${uuidv4()}`,
          brokers: ['host.docker.internal:9092'],
        },
        consumer: {
          groupId: 'consumer',
        },
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpCustomExceptionFilter());
  app.useGlobalFilters(new ExceptionFilter());

  await app.listen();
}

bootstrap();
