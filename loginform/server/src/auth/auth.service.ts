import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { clearConfigCache } from 'prettier';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    // console.log("services is running")
    const {  email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existEmail= await this.userModel.findOne({email :email})
    if(existEmail){
      throw  new NotFoundException('Email already in use')
    }else{
      const user = await this.userModel.create({
        email,
        password: hashedPassword,
      });
      const token = this.jwtService.sign({ id: user._id });
      const data  = {...user,token}
      console.log(data)
      return data;
    }
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password');
    }
    const token =  this.jwtService.sign({ id: user._id });
    

    console.log(token)
    return {token};
  }
}