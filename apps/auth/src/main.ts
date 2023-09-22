import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Transport } from '@nestjs/microservices';
import cookieParser from 'cookie-parser'
import { AuthAuthorize } from '@scraping-app/libs/contracts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RMQ_HOST')],
      queue: AuthAuthorize.queue,
    }
  });

  app.use(cookieParser());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));

  await app.startAllMicroservices();

  const httpPort = configService.getOrThrow('HTTP_PORT')
  await app.listen(httpPort);

  Logger.log(
    `🚀 Application is running on: http://localhost:${httpPort}/${globalPrefix}`
  );
}

bootstrap();
