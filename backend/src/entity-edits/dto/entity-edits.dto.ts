import { UpdateHymnDto } from "src/hymns/dto/update-hymn.dto"

import { IsEnum, IsOptional, IsObject, ValidateNested } from 'class-validator';
import { UpdateColDto } from "src/collections/dto/req/update-col.dto";
import { Type } from "class-transformer";


enum EditType {
  UPDATE = 'update',
  CREATE = 'create',
  DELETE = 'delete',
}

enum EditEntityType {
  HYMN = 'hymn',
  COLLECTION = 'collection'
}

export class CreateEntityEditDto {
  @IsEnum(EditType)
  type: EditType;

  @IsEnum(EditEntityType)
  entityType: EditEntityType

  @IsOptional()
  entityId?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Object)
  data?: UpdateHymnDto | UpdateColDto;
}