/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { SignupService } from './signup.service';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Get()
  @Render('signup')
  getHello() {
    return;
  }

  @Post() 
  @Render('signup')
  async addUser(@Body() user:any) {
    const userAdded=await this.signupService.addUser(user.uname, user.psw, user.auth_code);
    if(userAdded==0) {
      return {message:"Success!!"};
    }
    else return {message:"User Already exists!!!"}
  }  
}