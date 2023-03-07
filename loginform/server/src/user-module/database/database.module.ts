import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://BAravind:Aru9900@cluster0.fq4pskd.mongodb.net/Credentials",{ useNewUrlParser: true })],
})
export class databaseModule {}