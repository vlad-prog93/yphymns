import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class Collection {

  @Prop({ required: true, unique: true })
  name: string;
}


export const CollectionSchema = SchemaFactory.createForClass(Collection)

