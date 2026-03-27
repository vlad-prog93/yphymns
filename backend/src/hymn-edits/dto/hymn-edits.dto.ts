import { UpdateHymnDto } from "src/hymns/dto/update-hymn.dto"

import { IsEnum, IsOptional, IsObject } from 'class-validator';

export class CreateHymnEditDto {
  @IsEnum(['update', 'create', 'delete'])
  type: 'update' | 'create' | 'delete';

  @IsOptional()
  hymnId?: string;

  @IsObject()
  data: UpdateHymnDto;
}