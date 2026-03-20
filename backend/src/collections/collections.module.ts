import { forwardRef, Module } from '@nestjs/common';
import { CollectionsController } from './collections.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionSchema } from 'src/collections/collections.schema';
import { CollectionsService } from 'src/collections/collecrions.service';
import { HymnsModule } from 'src/hymns/hymns.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Collection', schema: CollectionSchema },
    ]),
    forwardRef(() => HymnsModule)
  ],
  controllers: [CollectionsController],
  providers: [CollectionsService],
  exports: [CollectionsService, MongooseModule]
})
export class CollectionsModule { }
