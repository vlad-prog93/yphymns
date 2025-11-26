import { forwardRef, Module } from '@nestjs/common';
import { HymnsController } from './hymns.controller';
import { HymnsService } from './hymns.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HymnSchema } from 'src/hymns/hymns.schema';
import { CollectionsModule } from 'src/collections/collections.module';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Hymn', schema: HymnSchema },
  ]),
  forwardRef(() => CollectionsModule)
  ],
  controllers: [HymnsController],
  providers: [HymnsService],
  exports: [HymnsService]
})
export class HymnsModule { }
