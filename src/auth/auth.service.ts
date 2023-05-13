import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { CreateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Injectable()
export class AuthService {
  constructor( 
    @InjectRepository(User)private userRepository: Repository<User>,
    private jwtService: JwtService
    ) {}
  
  async validateUser(name: string, password: string) {
    const user = await this.userRepository.findOneBy({name});

    if (user && await user.comparePassword(password)) {
      
      const payload = {name: user.name, sub: user.id, products: user.productids};
      const tokens = await this.tokens(user) 
      return{
        code:200,
        tokens
      }
      
    }
    return null;
  }
  async tokens(user){
    const payload = {name: user.name, sub: user.id,  products: user.productids}
    let accToken = await this.jwtService.signAsync(payload,{
      expiresIn: 60*30,
      secret:"dsjakljdlasjkdlwjiajdl"
    });
    let refrToken = await this.jwtService.signAsync(payload,{
      expiresIn: 60*60*24*15,
      secret:"dsajklwaiodjail"
    }); 
    
    return {
      access_Token: accToken, 
      refresh_token: refrToken
    };

  }
  async createUser(userDetails: CreateUserParams){

    if(await this.userRepository.findOneBy({name: userDetails.name}) != null){
      return {code:403, message:"Theres already a user with this name"};
    }

    const salt = await bcrypt.genSalt();
    userDetails.password  = await bcrypt.hash(userDetails.password, salt);
    
    const newUser = this.userRepository.create({...userDetails});
    this.userRepository.save(newUser);
    const tokens = await this.tokens(newUser);

    return {code:200, tokens};

  }

}