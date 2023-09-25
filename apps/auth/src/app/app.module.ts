import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalCustomStrategy } from './strategies/local-custom.strategy';

@Module({
  imports: [
    PassportModule,
    PassportModule.register({ defaultStrategy: LocalCustomStrategy.key }),
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.auth.env',
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.getOrThrow('JWT_EXPIRATION')}s`
        }
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LocalStrategy,
    JwtStrategy,
    LocalCustomStrategy,
  ],
})
export class AppModule { }
