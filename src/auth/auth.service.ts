import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './auth.repository';
import { AuthControllerDto } from './dto/auth.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository, private jwtService: JwtService
  ) {}

  async signUp(authControllerDto: AuthControllerDto): Promise<void> {
    return this.userRepository.signUp(authControllerDto);
  }

  async signIn(authControllerDto: AuthControllerDto): Promise<{accessToken: string}> {
    const userName = await this.userRepository.validateUserPassword(
      authControllerDto,
    );
    if (!userName) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload = { userName };
    const accessToken = this.jwtService.sign(payload);

    return {accessToken};
  }
}
