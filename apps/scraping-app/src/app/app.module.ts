import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScrapingModule } from './scraping/scraping.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.scrap.env',
    }),
    ScrapingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
