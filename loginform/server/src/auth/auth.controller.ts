import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { LocalAuthGraud } from './local.auth-guard';
// import { JwtStrategy } from './jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGraud)
  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto, @Res() response): Promise<any> {
    const result:any = await this.authService.signUp(signUpDto)
    if(result){
      return response.status(200).send({status:"success", message:"Registered successfully"})
    }else{
      return response.status(400).send({status:"success", message:"failed to register"})
    }
  }

  // @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Res() response): Promise<any> {
    const result:any =await this.authService.login(loginDto)
    if(result){
      return response.status(200).send({status:"success", message:"Registered successfully",data:result.token})
    }else{
      return response.status(400).send({status:"success", message:"failed to register"})
    }
  }
}