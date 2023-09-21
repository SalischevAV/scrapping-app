import { IsEmail, IsStrongPassword, IsString } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;
}