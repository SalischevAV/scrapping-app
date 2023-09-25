import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {  AuthRegister } from '@scraping-app/libs/contracts';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ScrappingController } from './controllers/scrapping.contriller';

@Module({
  controllers: [AuthController, ScrappingController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.api.env',
    }),
    ClientsModule.registerAsync([
      {
        name: AuthRegister.injectionToken,
        useFactory: (configService: ConfigService) =>({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RMQ_HOST')],
            queue: AuthRegister.queue,
          }
        }),
        inject: [ConfigService],
      }
    ]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.getOrThrow('JWT_EXPIRATION')}s`
        }
      }),
      inject: [ConfigService]
    }),
  ]
})
export class AppModule {}
