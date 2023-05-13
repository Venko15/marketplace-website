import {ExtractJwt, Strategy} from 'passport-jwt'
import {PassportStrategy} from '@nestjs/passport'
import {Injectable} from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class StrategyJwtRT extends PassportStrategy(Strategy,'refresh-jwt'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "dsajklwaiodjail",
            passReqToCallBack : true
        })
    }

    async validate(req: Request, payload:any){
        const refrToken = req.get('authorization').replace('Bearer', '').trim()
        return {id: payload.sub, name: payload.name, products: payload.products, refrToken};
    }
}
