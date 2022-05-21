import { Body, Controller, Get, Param, Patch, Post, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'Users/users.entity';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("create") 
  @Render('createrepo')
  async create(@Body('rname') rname:string,@Body('desc') desc:string) {
    return {message : await this.appService.create(rname,desc)};
  }

  @Get()
  @Render('login')
  login() {
    return;
  }

  @Post() 
  async signin(@Body() user , @Res() res:Response) {
    const ret=await this.appService.signin(user);
    if(ret==1 || ret==2) res.render('login',{message: "Invalid Username or Password!!!"});
    else res.render('createrepo',{message:ret})
    return  ;
  }

}
