import {ExtractJwt, Strategy} from 'passport-jwt'
import {PassportStrategy} from '@nestjs/passport'
import {Injectable} from '@nestjs/common'
import { Request } from 'express'
import { JwtRtPayload } from 'src/utils/types'

@Injectable()
export class StrategyJwtRT extends PassportStrategy(Strategy,'refresh-jwt'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: ,
            passReqToCallback : true
        })
    }

    async validate(req:Request, payload:JwtRtPayload){
        const token = req?.get("Authorization")?.replace("Bearer","")?.trim()
        return {...payload, token};
    }
}
