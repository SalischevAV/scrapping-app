import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from '@scraping-app/nest-decorators';
import { UserEntity } from '@scraping-app/models';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthAuthorize } from '@scraping-app/libs/contracts';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserEntity,
    @Res({passthrough: true}) response: Response 
    ){
      await this.appService.login(user, response);
      response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern(AuthAuthorize.topic)
  async authenticate(
    @Payload() data: AuthAuthorize.Response & AuthAuthorize.Request
  ){
    return data.user;
  }
}
