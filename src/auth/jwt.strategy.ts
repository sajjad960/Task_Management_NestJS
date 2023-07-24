import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from './auth.repository';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'topsecretyoo',
    });
  }

  async validate(payload: any): Promise<User> {
    const { userName } = payload;
    const user = await this.userRepository.findOne({ where: {
        userName
    } });

    if(!user){
        throw new UnauthorizedException()
    }
    return user;
  }
}
