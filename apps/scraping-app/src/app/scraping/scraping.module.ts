import { Module } from '@nestjs/common';
import { ScrapingController } from './scraping.controller';
import { ScrapingService } from './scraping.service';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthAuthorize } from '@scraping-app/libs/contracts';

@Module({
  controllers: [ScrapingController],
  providers: [ScrapingService],
  imports: [
    ClientsModule.registerAsync([
      {
        name: AuthAuthorize.injectionToken,
        useFactory: (configService: ConfigService) =>({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RMQ_HOST')],
            queue: AuthAuthorize.queue,
          }
        }),
        inject: [ConfigService],
      }
    ])
  ]
})
export class ScrapingModule {}
