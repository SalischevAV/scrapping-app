import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService: ConfigService = app.get(ConfigService);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  app.use(cookieParser());


  const httpPort = configService.getOrThrow('HTTP_PORT');
  await app.listen(httpPort);
  Logger.log(
    `🚀 Application is running on: http://localhost:${httpPort}/${globalPrefix}`
  );
}

bootstrap();
