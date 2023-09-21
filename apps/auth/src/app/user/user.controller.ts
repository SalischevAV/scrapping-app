import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserDto } from '@scraping-app/dtos';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto){
        return this.userService.createUser(createUserDto);
    }

    @Get()
    async getUser(){
        return this.userService.getUsers();
    }
}
