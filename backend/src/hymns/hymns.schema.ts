import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'


@Schema()
export class Hymn {
  @Prop({ required: true })
  number: number;

  @Prop({ required: true })
  collection: string;

  @Prop({ required: true })
  shortText: string;

  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  text: any

  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  text_with_accords: any
}


export const HymnSchema = SchemaFactory.createForClass(Hymn)

