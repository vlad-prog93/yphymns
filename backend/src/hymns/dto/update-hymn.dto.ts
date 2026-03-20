import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Types } from "mongoose";
import { CreateHymnDto } from "src/hymns/dto/create-hymn.dto";

export class UpdateHymnDto extends CreateHymnDto {
  @ApiProperty({ example: "691db3aea6816f641e5be25e" })
  @IsString()
  _id: Types.ObjectId | string;
}