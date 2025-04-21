import { Module } from '@nestjs/common';
import { HymnsController } from './hymns.controller';
import { HymnsService } from './hymns.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HymnSchema } from 'src/hymns/hymns.schema';
import { CollectionSchema } from 'src/collections/collections.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Hymn', schema: HymnSchema },
    { name: 'Collection', schema: CollectionSchema },
  ])],
  controllers: [HymnsController],
  providers: [HymnsService]
})
export class HymnsModule { }
