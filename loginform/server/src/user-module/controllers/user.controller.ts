import { Controller, Get, HttpStatus, Res, Body, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Response } from 'express';
import { CreateUserDTO } from '../dto/user.dto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

@Post()
@UsePipes(new ValidationPipe())
  async  createUser(@Res() res: Response, @Body() userParam: CreateUserDTO) {
    try {
    console.log("response", res)
    const data = await this.userService.createUser(userParam);
    res.status(HttpStatus.OK).json(data);
    } catch(err){ 
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  } 
 
  @Get()
  async listUser( @Res() res: Response ) {
    try {      
    const data = await this.userService.listUser();
    res.status(HttpStatus.OK).json(data)
  } catch(err){
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
  }
  // @Get()
  // async findUser(@Res() res:Response,@Body() email:string,password:string){
  //   return await this.userService.findUser({email,password})
  // }
}
