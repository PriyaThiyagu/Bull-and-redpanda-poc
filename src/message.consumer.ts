import { Process, Processor } from "@nestjs/bull";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { Job } from "bull";
import { ConsumerService } from "./kafka/consumer.service";

@Injectable()
export class TestConsumer implements OnModuleInit{
    constructor(private readonly consumerService:ConsumerService){}

    async onModuleInit() {
        await this.consumerService.consume(
            {topics:['chat-room'],fromBeginning:true},{
            
                eachMessage:async({topic,partition,message})=>{
                    console.log({
                        value:message.value.toString(),
                        topic:topic.toString(),
                        partition:partition.toString()
                    }
                    )
                }
            }
        )
    }
}

@Processor('message-queue')
export class MessageConsumer {
    @Process('message-job')
    messagejob(job: Job<unknown>) {
        console.log(job.data);
    }
    
}
