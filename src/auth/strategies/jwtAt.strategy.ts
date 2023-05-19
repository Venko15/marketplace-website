import {ExtractJwt, Strategy} from 'passport-jwt'
import {PassportStrategy} from '@nestjs/passport'
import {Injectable} from '@nestjs/common'
import { JwtAtPayload } from 'src/utils/types';
import { TokenConfig } from 'src/configs/auth.config';

@Injectable()
export class StrategyJwtAT extends PassportStrategy(Strategy, 'access-jwt'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: TokenConfig.at
        })
    }

    async validate(payload:JwtAtPayload){
        return payload;
    }
}
