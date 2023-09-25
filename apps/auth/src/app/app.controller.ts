import { Controller, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentUser } from '@scraping-app/nest-decorators';
import { UserEntity } from '@scraping-app/models';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthAuthorize, AuthLogin } from '@scraping-app/libs/contracts';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalCustomAuthGuard } from './guards/custom-local-auth.guard';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalCustomAuthGuard)
  @MessagePattern(AuthLogin.topic)
  async login(@CurrentUser() user: UserEntity){
     return await this.appService.asyncLogin(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern(AuthAuthorize.topic)
  async authenticate(
    @Payload() data: AuthAuthorize.Response & AuthAuthorize.Request
  ){
    return data.user;
  }
}
