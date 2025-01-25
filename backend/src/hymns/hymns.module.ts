import { Module } from '@nestjs/common';
import { HymnsController } from './hymns.controller';
import { HymnsService } from './hymns.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Hymn, HymnSchema } from 'src/hymns/hymns.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Hymn.name, schema: HymnSchema }])],
  controllers: [HymnsController],
  providers: [HymnsService]
})
export class HymnsModule { }
