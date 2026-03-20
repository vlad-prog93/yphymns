import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HymnEditDocument = HymnEdit & Document;

@Schema({ timestamps: true })
export class HymnEdit {
  @Prop({ required: true })
  hymnId: string;

  @Prop({ required: true })
  proposedBy: string; // userId

  @Prop({ required: true, type: Object })
  data: any; // новые данные гимна

  @Prop({ default: 'pending' })
  status: string; // pending | approved | rejected
}

export const HymnEditSchema = SchemaFactory.createForClass(HymnEdit);