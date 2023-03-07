import {  Injectable, NotFoundException } from '@nestjs/common';
import { JwtSecretRequestType, JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
// import { Hash } from 'crypto';
import { Model } from 'mongoose';
import { CreateUserDTO } from '../dto/user.dto';
import { User } from '../interface/user.interface';



@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  public async listUser(): Promise<User []> {
    return await this.userModel.find();
}

public async createUser(user:CreateUserDTO):Promise<User>{
  const findEmail = await this.userModel.findOne({email:user.email})
  if(findEmail){
    throw new NotFoundException('Email already in use')
  }
 return await new this.userModel(user).save() 
}
// async findUser(user:CreateUserDTO):Promise<User>{
//   const existMail = await this.userModel.findOne({email:user.email})
//   if(!existMail){
//     throw new NotFoundException('User not found need to register')
//   }
//   // const compare = comparePassword(user.password)
//   return existMail;

// }
}
