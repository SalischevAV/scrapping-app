import {IsNumber, IsNotEmpty} from 'class-validator'

export class GetUserDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}