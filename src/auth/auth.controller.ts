import { Auth } from 'typeorm';
import { AuthService } from './auth.service';
import { AuthControllerDto } from './dto/auth.dto';
import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decoder';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() authCredentialDto: AuthControllerDto) {
    return this.authService.signUp(authCredentialDto);
  }

  @Post('signin')
  @UsePipes(ValidationPipe)
  async signIn(
    @Body() authCredentialDto: AuthControllerDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialDto);
  }

//   @Post('/test')
//   @UseGuards(AuthGuard())
//   test(@Req() req) {
//     console.log(req.user);
  
//   }
}
