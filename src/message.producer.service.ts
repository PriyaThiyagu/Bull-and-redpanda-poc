import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { ProducerService } from "./kafka/producer.service";

@Injectable()
export class MessageProducerService{
    constructor(@InjectQueue('message-queue')private queue:Queue,
    private readonly producerService:ProducerService
    ){}
    
    async sendMessage(msg:string){
        await this.queue.add('message-job',{
            name:msg,
            string:msg
        },)
        await this.producerService.produce({
            topic:'chat-room',
            messages:[
              {
                value:'Message published'
              }
            ]
          })
        } 
        
    }
