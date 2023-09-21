import { ConfigService } from '@nestjs/config';
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  const configService: ConfigService = app.get(ConfigService);
  const httpPort = configService.getOrThrow('HTTP_PORT')
  await app.listen(httpPort);
  Logger.log(
    `🚀 Application is running on: http://localhost:${httpPort}/${globalPrefix}`
  );
}

bootstrap();
