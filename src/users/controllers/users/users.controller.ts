import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService ){}
    
    @Get('/get')
    async getUsers(@Body() req:CreateUserDto){
        console.log(req);
        const users = await this.userService.findUser(req['name']);
        return users;
    }
    @Post('/add')
    addUser(@Body() createUserDto: CreateUserDto){
 
        this.userService.createUser(createUserDto);
        return {"code":200};
    }

}
