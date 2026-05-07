import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UpdateColDto } from 'src/collections/dto/req/update-col.dto';
import { UpdateHymnDto } from 'src/hymns/dto/update-hymn.dto';

export type EntityEditDocument = EntityEdit & Document;

@Schema({ timestamps: true })
export class EntityEdit {
  @Prop({ enum: ['create', 'update', 'delete'], default: 'update', required: true })
  type: string;

  @Prop({ enum: ['hymn', 'collection'], required: true })
  entityType: 'hymn' | 'collection'

  @Prop({ required: true })
  entityId: mongoose.Types.ObjectId;

  @Prop({ required: true, type: Object })
  data: UpdateHymnDto | UpdateColDto;

  @Prop({ type: mongoose.Types.ObjectId, required: true, ref: 'User' })
  proposedBy: mongoose.Types.ObjectId;

  @Prop({ enum: ['pending', 'approved', 'rejected'], default: 'pending', required: true })
  status: string
}

export const EntityEditSchema = SchemaFactory.createForClass(EntityEdit);