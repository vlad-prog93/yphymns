import { Module } from "@nestjs/common";
import { HymnsModule } from './hymns/hymns.module';
import { MongooseModule } from '@nestjs/mongoose'


@Module({
  controllers: [],
  providers: [],
  imports: [MongooseModule.forRoot(`mongodb://${process.env.URL_MONGO || 'localhost'}/hymns`),
    HymnsModule],

})
export class AppModule { }