/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { resolve } from 'path';
import { Repository } from 'typeorm';
import { User } from 'Users/users.entity';

@Injectable()
export class SignupService {
  constructor(@InjectRepository(User) private userRepository : Repository<User>) {}

  
  async addUser(uname:string, password:string, auth_code:string) {
    try {
      await this.userRepository.findOneOrFail(uname);
    } catch(err) {
      const user= this.userRepository.create({uname:uname,
        password:password,
        auth_code:auth_code
      });
      this.userRepository.save(user);
      return Promise.resolve(0);
    }
    return Promise.resolve(1);
  }
}
