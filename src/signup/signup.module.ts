/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import config from 'ormconfig';
import { User } from 'Users/users.entity';

@Module({
  imports: [TypeOrmModule.forRoot(config),TypeOrmModule.forFeature([User])],
  controllers: [SignupController],
  providers: [SignupService],
})
export class SignupModule {}