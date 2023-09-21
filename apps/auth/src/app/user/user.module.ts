import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DataBaseModule } from '@scraping-app/database';
import { UserEntity } from '@scraping-app/models';
import { UserRepository } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports:[
    DataBaseModule,
    DataBaseModule.forFeature([UserEntity]),
  ],
  exports: [UserService],
})
export class UserModule {}
