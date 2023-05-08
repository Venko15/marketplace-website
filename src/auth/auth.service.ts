import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { CreateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor( 
    @InjectRepository(User)private userRepository: Repository<User>,
    private JwtService: JwtService
    ) {}
  
  async validateUser(name: string, password: string) {
    const user = await this.userRepository.findOneBy({name});
    if (user && await user.comparePassword(password)) {
      const payload = {name: user.name, sub: user.id, products: user.productids};
      return{
        access_token: await this.JwtService.signAsync(payload)
      }

    }
    return null;
  }

  async createUser(userDetails: CreateUserParams){

    if(await this.userRepository.findOneBy({name: userDetails.name}) != null){
      return {code:403, message:"Theres already a user with this name"};
    }

    const salt = await bcrypt.genSalt();
    userDetails.password  = await bcrypt.hash(userDetails.password, salt);
    const newUser = this.userRepository.create({...userDetails});
    this.userRepository.save(newUser);
    return {code:200};

  }
}