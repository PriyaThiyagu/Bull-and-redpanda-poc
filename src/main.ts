import logger from './configs/logger';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({ logger}),
    );
    await app.listen(3002);
  } catch (error) {
    logger.error({ err: error });
    process.exit();
  }
}
bootstrap();
