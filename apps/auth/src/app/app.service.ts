import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@scraping-app/models';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ){}

  login(user: UserEntity, response: Response) {
    const tokenPayload = {
      userId: user.id
    }

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });

    response.setHeader('Authentication', `bearer ${token}`)

    return token;
  }
}
