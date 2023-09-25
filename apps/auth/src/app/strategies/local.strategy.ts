import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { UserService } from './../user/user.service';
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy} from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    protected readonly logger = new Logger(LocalStrategy.name)
    constructor (
        private readonly userService: UserService,
        private moduleRef: ModuleRef,
        ){
        super({
            usernameField: 'email',
            passReqToCallback: true,
        })
    }

    async validate(request: Request, email: string, password: string) {
        const contextId = ContextIdFactory.getByRequest(request);
        console.log(contextId)
        try {
            return await this.userService.verifyUser(email, password);          
        } catch (error) {
            this.logger.error(error);
            throw new UnauthorizedException(error);
        }
    }
}