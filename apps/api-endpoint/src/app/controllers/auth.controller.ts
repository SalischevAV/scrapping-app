import { Body, Controller, Inject, Post, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateUserDto } from "@scraping-app/dtos";
import { AuthLogin, AuthRegister } from "@scraping-app/libs/contracts";
import { firstValueFrom } from "rxjs";

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AuthRegister.injectionToken) private readonly authService: ClientProxy,
    ) { }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return await firstValueFrom(
            this.authService.send<AuthRegister.Response, AuthRegister.Request>(AuthRegister.topic, createUserDto)
        )
    }

    @Post('login')
    async login(@Body() createUserDto: CreateUserDto) {
       try {
        return await firstValueFrom(
            this.authService.send<AuthLogin.Response, AuthLogin.Request>(AuthLogin.topic, createUserDto)
        )
       } catch (error) {
            throw new UnauthorizedException()
       }
    }
}