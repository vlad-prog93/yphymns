import { Module } from '@nestjs/common';
import { CollectionsController } from './collections.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionSchema } from 'src/collections/collections.schema';
import { HymnSchema } from 'src/hymns/hymns.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Collection', schema: CollectionSchema },
    { name: 'Hymn', schema: HymnSchema },
  ])],
  controllers: [CollectionsController],
  providers: []
})
export class CollectionsModule { }
