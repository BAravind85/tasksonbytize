import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { databaseModule } from './user-module/database/database.module';
import { userModule } from './user-module/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
  // MongooseModule.forRoot(process.env.DB_URI),

  userModule,databaseModule,AuthModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
