import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { HymnContent } from 'src/hymns/dto/types';

export type HymnDocument = Hymn & mongoose.Document

@Schema()
export class Hymn {
  @Prop({ required: true })
  number: number;

  @Prop({ type: mongoose.Types.ObjectId, required: true, ref: 'Collection' })
  collection: mongoose.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  text: HymnContent

  // @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  // text_with_accords: HymnContent
}


export const HymnSchema = SchemaFactory.createForClass(Hymn)

