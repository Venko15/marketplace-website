import {ExtractJwt, Strategy} from 'passport-jwt'
import {PassportStrategy} from '@nestjs/passport'
import {Injectable} from '@nestjs/common'
import { JwtAtPayload } from 'src/utils/types';

@Injectable()
export class StrategyJwtAT extends PassportStrategy(Strategy, 'access-jwt'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "dsjakljdlasjkdlwjiajdl"
        })
    }

    async validate(payload:JwtAtPayload){
        return payload;
    }
}
