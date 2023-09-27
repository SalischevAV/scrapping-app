import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    accessToken?: string;

    @IsString()
    refreshToken?: string;
}