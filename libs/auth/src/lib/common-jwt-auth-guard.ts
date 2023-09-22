import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { AuthAuthorize } from "@scraping-app/libs/contracts";
import { Observable, tap, map } from "rxjs";
import { ClientProxy } from '@nestjs/microservices';
import { TokenPayload } from "@scraping-app/interfaces";
import { UserEntity } from "@scraping-app/models";

@Injectable()
export class CommonJwtAuthGuard implements CanActivate{
    constructor(@Inject(AuthAuthorize.injectionToken) private readonly authClient: ClientProxy){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const jwt: TokenPayload = context.switchToHttp().getRequest().cookies?.Authentication;
        if(!jwt){
            return false;
        }

        return this.authClient
            .send<UserEntity>(AuthAuthorize.topic, { Authentication: jwt})
            .pipe(
                tap((res) => {
                    context.switchToHttp().getRequest().user = res;
                }),
                map(() => true),
            )
    }
}