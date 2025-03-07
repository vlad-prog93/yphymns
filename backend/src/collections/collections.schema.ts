import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'


@Schema()
export class Collection {
  @Prop({ required: true })
  name: string;
}


export const CollectionSchema = SchemaFactory.createForClass(Collection)

