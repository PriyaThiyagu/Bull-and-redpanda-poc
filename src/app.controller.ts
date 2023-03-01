import { Controller, Get, Query } from '@nestjs/common';
import { ProducerService } from './kafka/producer.service';

import { MessageProducerService } from './message.producer.service';

@Controller()
export class AppController {
  constructor(
    private messageProducerService:MessageProducerService,
    private producerService:ProducerService
  ) {}

  @Get('sendMessage')
  async sendMessage(@Query('msg') msg:string){
    await this.messageProducerService.sendMessage(msg);
    return msg;
  }
  
 
}
