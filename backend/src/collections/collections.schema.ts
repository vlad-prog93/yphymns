import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose';

export type CollectionDocument = Collection & mongoose.Document

@Schema()
export class Collection {

  @Prop({ required: true, unique: true })
  name: string;
}


export const CollectionSchema = SchemaFactory.createForClass(Collection)

