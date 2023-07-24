import { Auth } from 'typeorm';
import { AuthService } from './auth.service';
import { AuthControllerDto } from './dto/auth.dto';
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post("signup")
    @UsePipes(ValidationPipe)
    signUp(@Body() authCredentialDto: AuthControllerDto){
        return this.authService.signUp(authCredentialDto);
    }

    @Post("signin")
    @UsePipes(ValidationPipe)
    signIn(@Body() authCredentialDto: AuthControllerDto){
        return this.authService.signIn(authCredentialDto);
    }



}