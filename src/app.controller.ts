import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import {join} from "path"
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  renderHome(@Res() res) {
    res.sendFile(join(__dirname,"../src/","public/html", "index.html"))
  }
  @Get("/login")
  renderLogin(@Res() res) {
    res.sendFile(join(__dirname,"../src/","public/html", "login.html"))
  }
  @Get("/register")
  renderRegister(@Res() res) {
    res.sendFile(join(__dirname,"../src/","public/html", "register.html"))
  }


}
