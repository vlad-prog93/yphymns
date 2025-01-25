import { Module } from "@nestjs/common";
import { HymnsModule } from './hymns/hymns.module';
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from "@nestjs/config";

@Module({
  controllers: [],
  providers: [],
  imports: [
    MongooseModule.forRoot(process.env.MONGO || 'mongodb://127.0.0.1:27017/hymns'),
    HymnsModule,
    ConfigModule.forRoot()
  ],

})
export class AppModule { }