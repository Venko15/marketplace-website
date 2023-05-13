import {ExtractJwt, Strategy} from 'passport-jwt'
import {PassportStrategy} from '@nestjs/passport'
import {Injectable} from '@nestjs/common'

@Injectable()
export class StrategyJwtAT extends PassportStrategy(Strategy, 'access-jwt'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "dsjakljdlasjkdlwjiajdl"
        })
    }

    async validate(payload:any){
        return {id: payload.sub, name: payload.name, products: payload.products};
    }
}
