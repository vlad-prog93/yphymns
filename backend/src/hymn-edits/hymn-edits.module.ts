import { MongooseModule } from '@nestjs/mongoose';
import { HymnEdit, HymnEditSchema } from './schemas/hymn-edit.schema';
import { forwardRef, Module } from '@nestjs/common';
import { HymnEditsController } from 'src/hymn-edits/hymn-edits.controller';
import { HymnEditsService } from 'src/hymn-edits/hymn-edits.service';
import { HymnsModule } from 'src/hymns/hymns.module';
import { Hymn, HymnSchema } from 'src/hymns/hymns.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HymnEdit.name, schema: HymnEditSchema },
      { name: Hymn.name, schema: HymnSchema },
    ]),
    forwardRef(() => HymnsModule)
  ],
  controllers: [HymnEditsController],
  providers: [HymnEditsService],
})
export class HymnEditsModule { }