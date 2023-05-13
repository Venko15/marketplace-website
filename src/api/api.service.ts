import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { CreateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ApiService {


    async getProducts(token){
        const resp = await fetch("/users/getProducts", {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
              "Authorization": "Bearer " + token,
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            })
        console.log(resp)
    }

}