import { Module } from "@nestjs/common";
import { HymnsModule } from './hymns/hymns.module';
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from "@nestjs/config";
import { CollectionsModule } from "src/collections/collections.module";
//import configuration from "./config/configuration";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRoot(
      process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017',
      {
        dbName: process.env.MONGODB_NAME || 'hymns',
        user: process.env.MONGODB_USER || '',
        pass: process.env.MONGODB_PASS || ''
      }),
    HymnsModule,
    CollectionsModule
  ],
})
export class AppModule { }