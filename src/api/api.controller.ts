import { Controller, Request,Res, Post, UseGuards, Body, Get, HttpStatus, Session, Req } from '@nestjs/common';
import { ApiService } from './api.service';
import { JwtRtAuthGuard } from 'src/auth/jwtRtAuthGuard.guard';


@Controller('api')
export class ApiController {
    constructor(private apiService: ApiService){}

    @UseGuards(JwtRtAuthGuard)
    @Get('/getUserProducts')
    async getProducts(@Body() Body, @Res({passthrough:true}) res){
        if(res.cookies.cookieAuth == null){
            res.send(HttpStatus.UNAUTHORIZED)
            return
        }
        
        return await this.apiService.getProducts(res.cookies.cookieAuth)
    }

}
