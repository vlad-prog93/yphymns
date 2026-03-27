import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UpdateHymnDto } from 'src/hymns/dto/update-hymn.dto';

export type HymnEditDocument = HymnEdit & Document;

@Schema({ timestamps: true })
export class HymnEdit {
  @Prop({ enum: ['create', 'update', 'delete'], default: 'update', required: true })
  type: string;

  @Prop({ required: true })
  hymnId: string;

  @Prop({ required: true })
  proposedBy: string; // userId

  @Prop({ required: true, type: Object })
  data: UpdateHymnDto; // новые данные гимна

  @Prop({ default: 'pending' })
  status: string; // pending | approved | rejected
}

export const HymnEditSchema = SchemaFactory.createForClass(HymnEdit);