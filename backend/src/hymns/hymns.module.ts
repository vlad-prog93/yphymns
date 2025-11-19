<<<<<<< HEAD
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
=======
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
>>>>>>> 189614972aa82f4d474c2598fff16f5afdb90c02
