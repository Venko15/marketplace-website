import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {User} from '../../../typeorm/entities/user.entity'
import { CreateUserParams } from 'src/utils/types';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>){}
    
    
    async findUser(name: string): Promise<User>  {
        return this.userRepository.findOneBy({name}); 

    }

    createUser(userDetails: CreateUserParams){
        const newUser = this.userRepository.create({...userDetails})
        return this.userRepository.save(newUser);
    }

}
