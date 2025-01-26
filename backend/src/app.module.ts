import { Module } from "@nestjs/common";
import { HymnsModule } from './hymns/hymns.module';
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from "@nestjs/config";
//import configuration from "./config/configuration";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRoot(
      process.env.MONGODB_URL || 'mongodb://mongodb:27017',
      {
        dbName: process.env.MONGODB_NAME || 'hymns',
        user: process.env.MONGODB_USER || 'admin1',
        pass: process.env.MONGODB_PASS || 'admin15678'
      }),
    HymnsModule,
  ],
})
export class AppModule { }