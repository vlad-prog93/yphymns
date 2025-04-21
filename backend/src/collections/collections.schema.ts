import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { HymnDocument } from 'src/hymns/hymns.schema';

export type CollectionDocument = Collection & mongoose.Document<mongoose.Types.ObjectId>

@Schema()
export class Collection {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hymn' }] })
  hymns: Array<HymnDocument>;
}


export const CollectionSchema = SchemaFactory.createForClass(Collection)

