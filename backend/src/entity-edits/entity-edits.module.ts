import { MongooseModule } from '@nestjs/mongoose';
import { EntityEdit, EntityEditSchema } from './schemas/entity-edit.schema';
import { forwardRef, Module } from '@nestjs/common';
import { EntityEditsController } from 'src/entity-edits/entity-edits.controller';
import { EntityEditsService } from 'src/entity-edits/entity-edits.service';
import { HymnsModule } from 'src/hymns/hymns.module';
import { Hymn, HymnSchema } from 'src/hymns/hymns.schema';
import { Collection } from 'mongoose';
import { CollectionSchema } from 'src/collections/collections.schema';
import { CollectionsModule } from 'src/collections/collections.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EntityEdit.name, schema: EntityEditSchema },
      { name: Hymn.name, schema: HymnSchema },
      { name: Collection.name, schema: CollectionSchema },
    ]),
    forwardRef(() => HymnsModule),
    forwardRef(() => CollectionsModule)
  ],
  controllers: [EntityEditsController],
  providers: [EntityEditsService],
})
export class EntityEditsModule { }