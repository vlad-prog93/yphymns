import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { Types } from "mongoose";


export class CreateHymnDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  number: number;

  @ApiProperty({ example: 'Молодежные гимны' })
  @IsString()
  collection: Types.ObjectId | string;

  @ApiProperty({ example: 'Дух правый обнови во мне, о Бог' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: {
      "2 verse 1 bridge": "Дух правый обнови во мне, о Бог, \nСердце чистое сотвори во мне. ",
      "2 verse 2 bridge": "Не отринь меня от лица Твоего, \nДуха Твоего не отними.  \nВозврати мне радость \nТвоего спасенья \nИ дух правый обнови во мне.",
      "3 verse 1 bridge": "Дух правый обнови во мне, о Бог, \nСердце чистое сотвори во мне.  "
    }
  })
  @IsObject()
  text: Record<string, string>;
}