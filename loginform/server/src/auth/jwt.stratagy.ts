import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt } from "passport-jwt";
// import { jwtConstants } from './constants';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
        constructor(){
            super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: 'codingwitharavind'
            })
        }
        async validate(playload:any){
            return {email:playload.email,userid:playload._id}
        }
}