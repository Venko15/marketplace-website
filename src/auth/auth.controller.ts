import { Controller, Request,Res, Post, UseGuards, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { JwtAuthGuard } from './jwtAuth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    
    @Post('/login')
    async login(@Body() b, @Res() res){
        try{
            const tokenJ = await this.authService.validateUser(b['name'], b['password'])
            res.cookie(process.env.COOKIE_NAME, tokenJ,{
                httpOnly:true,
                sameSite:'Lax',
                expires: new Date(new Date().getTime() + 300000)//300k ms = 5min za sq, ne e ot ogromno znachenie za momenta
            })
            return res.send({code:200});
        }catch(err){
            return res.send({code:404});
            
        }
    }

    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto){

        return await this.authService.createUser(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/info')
    async getUserInfo(@Request() req){
        return req.user;
    }
}
