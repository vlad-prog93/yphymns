import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { CollectionDocument } from 'src/collections/collections.schema';

export type HymnDocument = Hymn & mongoose.Document<mongoose.Types.ObjectId>

@Schema()
export class Hymn {
  @Prop({ required: true })
  number: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Collection' }] })
  collection: CollectionDocument;

  @Prop({ required: true })
  shortText: string;

  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  text: any

  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  text_with_accords: any
}


export const HymnSchema = SchemaFactory.createForClass(Hymn)

