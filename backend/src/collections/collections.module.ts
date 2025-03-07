import { Module } from '@nestjs/common';
import { CollectionsController } from './collections.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Collection, CollectionSchema } from 'src/collections/collections.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Collection.name, schema: CollectionSchema }])],
  controllers: [CollectionsController],
  providers: []
})
export class CollectionsModule { }
