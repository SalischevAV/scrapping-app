import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '@scraping-app/dtos';
import { UserService } from './user.service';
import { CurrentUser } from '@scraping-app/nest-decorators';
import { UserEntity } from '@scraping-app/models';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post('user')
    async createUser(@Body() createUserDto: CreateUserDto){
        return this.userService.createUser(createUserDto);
    }

    @Get('users')
    @UseGuards(JwtAuthGuard)
    async getUsers(){
        return this.userService.getUsers();
    }

    @Get('user')
    @UseGuards(JwtAuthGuard)
    async getUser(
        @CurrentUser() user: UserEntity
    ){
        return user;
    }
}
