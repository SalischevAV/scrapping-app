import { CanActivate, ExecutionContext, Inject, Injectable, Logger } from "@nestjs/common";
import { AuthAuthorize } from "@scraping-app/libs/contracts";
import { Observable, tap, map } from "rxjs";
import { ClientProxy } from '@nestjs/microservices';
import { TokenPayload } from "@scraping-app/interfaces";
import { UserEntity } from "@scraping-app/models";

@Injectable()
export class CommonJwtAuthGuard implements CanActivate {
    protected readonly logger = new Logger(CommonJwtAuthGuard.name)
    constructor(@Inject(AuthAuthorize.injectionToken) private readonly authClient: ClientProxy) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
            const request = context.switchToHttp().getRequest();
            const tokenFromRawHeaders: string = request.rawHeaders?.find((rawHeader: string) => rawHeader.includes('Bearer')).split(' ')[1]
        const jwt: TokenPayload = tokenFromRawHeaders
            || request.cookies?.Authorization
            || request.Authorization
            || request.headers?.Authorization
        if (!jwt) {
            this.logger.error('Token not found')
            return false;
        }

        return this.authClient
            .send<UserEntity>(AuthAuthorize.topic, { Authorization: jwt })
            .pipe(
                tap((res) => {
                    context.switchToHttp().getRequest().user = res;
                }),
                map(() => true),
            )
    }
}