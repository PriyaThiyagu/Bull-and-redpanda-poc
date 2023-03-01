import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MessageConsumer } from './message.consumer';
import { MessageProducerService } from './message.producer.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './message.consumer';

@Module({
  imports: [
    KafkaModule,    
    BullModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:async(configService:ConfigService)=>({
        redis:{
          host:configService.get('QUEUE_HOST'),
          port:configService.get('QUEUE_PORT'),
        }
      }),
    inject:[ConfigService],
  }),
    BullModule.registerQueue({
      name:'message-queue'
    },
    )
  ],
  controllers: [AppController],
  providers: [
    MessageProducerService,
    MessageConsumer,
    TestConsumer
    ],
})
export class AppModule {}
