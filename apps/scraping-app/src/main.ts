import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { ScrappingScrapping } from '@scraping-app/libs/contracts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RMQ_HOST')],
      queue: ScrappingScrapping.queue,
    }
  });

  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  app.use(cookieParser());

  await app.startAllMicroservices();

  Logger.log(
    `🚀 Scrapping service is running as microservice`
  );
}

bootstrap();
