/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupModule } from './signup/signup.module';
import { TypeOrmModule} from '@nestjs/typeorm' ;
import  config  from '../ormconfig';
import { User } from 'Users/users.entity';

@Module({
  imports: [TypeOrmModule.forRoot(config),TypeOrmModule.forFeature([User]),SignupModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
