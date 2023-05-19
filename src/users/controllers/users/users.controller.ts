import { Controller, Get, Post, Body, UseGuards, Param, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAtAuthGuard } from 'src/auth/guards/jwtAtAuth.guard';
import { JwtRtAuthGuard } from 'src/auth/guards/jwtRtAuthGuard.guard';
import { CreateProductDto } from 'src/products/dtos/CreateProduct.dto';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller("users")
export class UsersController {

    constructor(private userService: UsersService ){}
    
    @UseGuards(AuthGuard('access-jwt'))
    @Get("/getProducts")
    async getProducts(@Req() req){
        return {code:200, products:await this.userService.getProducts(req.user.sub)};
    }

    @UseGuards(AuthGuard('access-jwt'))
    @Post("/addProduct")
    async addProduct(@Body() createProductDto: CreateProductDto, @Req() req){
        if(createProductDto.ownerId == req.user.sub){
            return {code:401};
        }
        await this.userService.addProduct(req.user.sub,createProductDto);
        return {code:200};
    }

    @UseGuards(AuthGuard('access-jwt'))
    @Post("/deleteProduct/:id")
    async deleteProduct(@Param('id') id: string, @Req() req){
            if(req.user.productids.find({value:id}) == null){
                return {code:401}
            }
            return await this.userService.deleteProduct(id)


    }
}
