import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScrapingModule } from './scraping/scraping.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthAuthorize } from '@scraping-app/libs/contracts';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.scrap.env',
    }),
    ScrapingModule,
    // ClientsModule.registerAsync([
    //   {
    //     name: AuthAuthorize.injectionToken,
    //     useFactory: (configService: ConfigService) =>({
    //       transport: Transport.RMQ,
    //       options: {
    //         urls: [configService.getOrThrow<string>('RMQ_HOST')],
    //         queue: AuthAuthorize.queue,
    //       }
    //     }),
    //     inject: [ConfigService],
    //   }
    // ])
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
