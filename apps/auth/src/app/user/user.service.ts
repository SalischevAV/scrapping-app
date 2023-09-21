import { CREDENTIALS_ARE_INVALID, USER_ALREADY_EXISTS } from '@scraping-app/constants';
import { UserRepository } from './user.repository';
import { Injectable, Logger, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto, GetUserDto } from '@scraping-app/dtos';
import { UserEntity } from '@scraping-app/models';
import * as bcrypt from 'bcryptjs';
 
@Injectable()
export class UserService {
   
    private readonly logger = new Logger(UserService.name);
    
    constructor(
        private readonly userRepository: UserRepository,
        ){}

        private async validateCreateUserDto(createUserDto: CreateUserDto) {
            try {
                await this.userRepository.findOne({email: createUserDto.email})          
            } catch (error) {
                return;
            }
            throw new UnprocessableEntityException(USER_ALREADY_EXISTS);
        }

        async createUser(createUserDto: CreateUserDto) {
            await this.validateCreateUserDto(createUserDto);
            const passwordHash = await bcrypt.hash(createUserDto.password, 10);
            const newUserEntity = new UserEntity({...createUserDto, passwordHash})
            return this.userRepository.create(newUserEntity);
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
        
        async getUsers() {
            return this.userRepository.find({});
        }

        async getUser(getUserDto: GetUserDto) {
           return await this.userRepository.findOne(getUserDto)
        }
    }
    