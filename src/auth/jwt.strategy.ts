import {ExtractJwt, Strategy} from 'passport-jwt'
import {PassportStrategy} from '@nestjs/passport'
import {Injectable} from '@nestjs/common'
import * as dotenv from "dotenv";
import { join } from 'path';


@Injectable()
export class StrategyJwt extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_PASS
        })
    }

    async validate(payload:any){
        return {id: payload.sub, name: payload.name, products: payload.products};
    }
}
