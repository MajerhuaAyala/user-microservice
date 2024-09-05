import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { KafkaModule } from './transport/kafka.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { ApiConfigService } from './shared/services/api-config.service';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    KafkaModule,
    TypeOrmModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) =>
        configService.postgresConfig,
      inject: [ApiConfigService],
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
