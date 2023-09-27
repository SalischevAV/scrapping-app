import { UserService } from './user/user.service';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@scraping-app/models';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '@scraping-app/interfaces';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ){}

  login(user: UserEntity, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user.id
    }

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );
    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authorization', token, {
      httpOnly: true,
      expires,
    });

    response.setHeader('Authorization', `bearer ${token}`)

    return token;
  }

  async asyncLogin(user: UserEntity) {
    const tokenPayload: TokenPayload = {
      userId: user.id
    }

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );
    const token = this.jwtService.sign(tokenPayload);
    const userWithToken = await this.userService.updateUser({
      ...user,
        accessToken: token,
    })

    return {
      user: userWithToken,
      token
    };
  }
}
