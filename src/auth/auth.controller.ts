import { Controller, Request,Res, Post, UseGuards, Body, Get, HttpStatus, Session, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

import * as dotenv from 'dotenv'
import {join} from 'path'
dotenv.config({ path:join( __dirname,'..','/src','/.env')});

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    


    @Post('/login')
    async login(@Body() b, @Res({passthrough:true}) res, @Req() req){
        
        const tokenJ = await this.authService.validateUser(b['name'], b['password'])
        if(tokenJ == null){
            res.status(HttpStatus.UNAUTHORIZED).send("Wrong login credentials");
            return;
            
        }

        res.cookie(process.env.COOKIE_NAME, tokenJ.tokens.access_Token,{
                httpOnly:false,
                sameSite:'Lax',
                expires: new Date(new Date().getTime() + 300000)//300k ms = 5min za sq, ne e ot ogromno znachenie za momenta
        })
        
        return res.status(HttpStatus.OK).send(tokenJ.tokens.refresh_token)
 
    }

    
    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto){

        return {
            code:200, 
            tokens:(await this.authService.createUser(createUserDto)).tokens.refresh_token
        };
    }

}
