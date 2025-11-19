<<<<<<< HEAD
import { ApiProperty } from "@nestjs/swagger";
import { HymnContent } from "src/hymns/dto/types";



export class CreateHymnDto {
  @ApiProperty({ example: 1 })
  number: number;
  @ApiProperty({ example: 'Молодежные гимны' })
  collection: string;
  @ApiProperty({ example: 'Дух правый обнови во мне, о Бог' })
  shortText: string;
  @ApiProperty({
    example: {
      "2 verse 1 bridge": "Дух правый обнови во мне, о Бог, \nСердце чистое сотвори во мне. ",
      "2 verse 2 bridge": "Не отринь меня от лица Твоего, \nДуха Твоего не отними.  \nВозврати мне радость \nТвоего спасенья \nИ дух правый обнови во мне.",
      "3 verse 1 bridge": "Дух правый обнови во мне, о Бог, \nСердце чистое сотвори во мне.  "
    }
  })
  text: HymnContent;
  @ApiProperty({
    example: {
      "2 verse 1 bridge": "[Д{G}ух] правый [обнови{Bm}] во [мне{C},] о [Бог{D},] \n[С{G}ердце] чистое [со{D}твори] во [мне{C-D}.] ",
      "2 verse 2 bridge": "[Н{C}е] отринь [меня{D}] от [лица{G}] [Твоего{Em},] \n[Д{C}уха] [Твоего{D}] не [отними{G-G7}.]  \n[В{C}озврати] мне [ра{D}дость] \n[Т{G}воего] [спасен{Em}ья] \n[И{C}] дух правый [о{D}бнови{D7}] во [мне{G}.]",
      "3 verse 1 bridge": "[Д{G}ух] правый [обнови{Bm}] во [мне{C},] о [Бог{D},] \n[С{G}ердце] чистое [со{D}твори] во [мне{G-G7}.]  "
    }
  })
  text_with_accords: HymnContent
=======
export class CreateHymnDto {
  number: number;
  collection: string;
  shortText: string;
  text: any;
  text_with_accords: any
>>>>>>> 189614972aa82f4d474c2598fff16f5afdb90c02
}