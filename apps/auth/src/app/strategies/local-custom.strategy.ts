import { UserService } from './../user/user.service';
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy} from 'passport-custom';

@Injectable()
export class LocalCustomStrategy extends PassportStrategy(Strategy, 'custom-local') {
    static key = "custom-local"
    protected readonly logger = new Logger(LocalCustomStrategy.name)
    constructor (
        private readonly userService: UserService,
        ){
            super();
        }

    async validate(request: any) {
        try {
            const {email, password} = request.body || request;
            return await this.userService.verifyUser(email, password);          
        } catch (error) {
            this.logger.error(error);
            throw new UnauthorizedException(error);
        }
    }
}