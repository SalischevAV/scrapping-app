import { CREDENTIALS_ARE_INVALID } from '@scraping-app/constants';
import { UserRepository } from './user.repository';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '@scraping-app/dtos';
import { UserEntity } from '@scraping-app/models';
import * as bcrypt from 'bcryptjs';
 
@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);
    
    constructor(
        private readonly userRepository: UserRepository,
        ){}

        async createUser(createUserDto: CreateUserDto) {
            const passwordHash = await bcrypt.hash(createUserDto.password, 10);
            const newUserEntity = new UserEntity({...createUserDto, passwordHash})
            return this.userRepository.create(newUserEntity);
        }
        async getUsers() {
            return this.userRepository.find({});
        }

        async verifyUser(email: string, password: string) {
            const user = await this.userRepository.findOne({email});
            const isPasswordValid = await bcrypt.compare(password,  user.passwordHash);
            if(!isPasswordValid){
                this.logger.warn(`CREDENTIALS_ARE_INVALID, provided email: ${email}`);
                throw new UnauthorizedException(CREDENTIALS_ARE_INVALID);
            }
            return user;
        }
    }
    