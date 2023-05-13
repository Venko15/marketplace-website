import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAtAuthGuard } from 'src/auth/jwtAtAuth.guard';
import { JwtRtAuthGuard } from 'src/auth/jwtRtAuthGuard.guard';
import { CreateProductDto } from 'src/products/dtos/createProduct.dto';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller("users")
export class UsersController {

    constructor(private userService: UsersService ){}
    

    @Get("/getProducts")
    async getProducts(){
        await this.userService.getProducts(1)
        return {code:200};
    }
    @Post("/addProduct")
    async addProduct(@Body() createProductDto: CreateProductDto){
        console.log(createProductDto);
        this.userService.addProduct(createProductDto);
        return {code:200};
    }

}
