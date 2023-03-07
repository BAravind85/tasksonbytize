import { Module } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
// import { PassportModule } from '@nestjs/passport';
// import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './controllers/user.controller';
import { UserSchema } from './schemas/user.schema';
import { UserService } from './services/user.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema}])
  ],
  controllers: [UserController],
  providers: [UserService ]
})
export class userModule {}
