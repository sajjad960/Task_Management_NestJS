import { Auth } from 'typeorm';
import { AuthService } from './auth.service';
import { AuthControllerDto } from './dto/auth.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post("signup")
    signUp(@Body() authCredentialDto: AuthControllerDto){
        return this.authService.signUp(authCredentialDto);
    }

}
