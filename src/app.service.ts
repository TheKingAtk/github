import { All, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRepositoryCannotInheritRepositoryError, LockNotSupportedOnGivenDriverError, Repository } from 'typeorm';
import { User } from 'Users/users.entity';
import {Octokit, App} from 'octokit';
@Injectable()
export class AppService {

  currentUser:User;

  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async signin(user) {
    var login: User;
    try {
      login=await this.userRepository.findOneOrFail(user.uname);
      if(login.password != user.psw) return Promise.resolve(2);
    } catch(err) {
      return Promise.resolve(1);
    }
    this.currentUser=login;

    const octokit= new Octokit({ auth: login.auth_code });

    const 
    {
      data
    }=await octokit.rest.repos.listForAuthenticatedUser({visibility:'all'});
    
    var repositories : string="Repositories : ";
    for(var repo of data) {
      repositories+=repo.name;
      repositories+=', ';
    }
    return Promise.resolve(repositories);
  }

  async create(rname,desc) {
    const octokit = new Octokit({
      auth: this.currentUser.auth_code
    })
    try {
      await octokit.request('POST /user/repos', {name:rname, description: desc, auto_init:true});
    }catch(err) {
      return err;
    }
    return "Successfully Created!!!";
  }
}
