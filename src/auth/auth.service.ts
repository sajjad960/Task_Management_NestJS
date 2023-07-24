import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './auth.repository';
import { AuthControllerDto } from './dto/auth.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async signUp(authControllerDto: AuthControllerDto): Promise<void> {
    return this.userRepository.signUp(authControllerDto);
  }

  async signIn(authControllerDto: AuthControllerDto): Promise<string> {
    const userName = await this.userRepository.validateUserPassword(
      authControllerDto,
    );
    if (!userName) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return 'bal';
  }
}
