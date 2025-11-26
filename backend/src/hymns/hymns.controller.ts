import { Controller, Get, Post, Body, Param, Delete, Patch, StreamableFile, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { writeFileSync, createReadStream, readFileSync } from 'fs'
import { CreateHymnDto } from 'src/hymns/dto/create-hymn.dto';
import { UpdateHymnDto } from 'src/hymns/dto/update-hymn.dto';
import { HymnsService } from 'src/hymns/hymns.service';

@ApiTags('Гимны')
@Controller('api/hymns')
export class HymnsController {
  constructor(private HymnsService: HymnsService) { }

  @ApiOperation({ summary: 'Получение всех гимнов' })
  @ApiResponse({ status: 200, description: 'в json формате передается массив гимнов', type: [CreateHymnDto] })
  @Get()
  getAll() {
    return this.HymnsService.getAll()
  }

  @ApiOperation({ summary: 'Скачать все гимны в формате json' })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'Начнется загрузка файла',
    schema: {
      type: 'string',
      format: 'binary',
    },
  })
  @Get('/database')
  async getDataBase() {
    return this.HymnsService.getDataBase()
  }

  @ApiOperation({ summary: 'Получение одного гимна' })
  @ApiResponse({ status: 200, description: 'в json формате передается гимн', type: CreateHymnDto })
  @Get('/hymn/:id')
  getOne(@Param('id') id: string) {
    return this.HymnsService.getOne(id)
  }

  @ApiOperation({ summary: 'Создание гимна' })
  @ApiResponse({ status: 201, description: 'в ответе созданный гимн в формате json' })
  @Post()
  create(@Body() createHymnDto: CreateHymnDto) {
    return this.HymnsService.create(createHymnDto)
  }

  @ApiOperation({ summary: 'Загрузить на сайт гимны в формате json' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'JSON файл со списком гимнов',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Гимны успешно загружены', type: [CreateHymnDto] })
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: 10 * 1024 * 1024 }
  }))
  @Post('/database')
  async addFile(@UploadedFile() file: Express.Multer.File): Promise<CreateHymnDto[]> {
    return this.HymnsService.addFileWithHymns(file)
  }


  @ApiOperation({ summary: 'Удаление гимна' })
  @ApiResponse({ status: 201, description: 'в ответе id гимна', schema: { type: 'string' } })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    return this.HymnsService.delete(id)
  }

  @ApiOperation({ summary: 'Удаление всех гимнов' })
  @ApiResponse({ status: 201, description: 'в ответе { acknowledged: true, deletedCount: X }' })
  @Delete('')
  async deleteAll(): Promise<{ acknowledged: boolean, deletedCount: number }> {
    return this.HymnsService.deleteAll()
  }

  @ApiOperation({ summary: 'Изменение гимна' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 201, description: 'в ответе измененный гимн в формате json', type: UpdateHymnDto })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() hymn: UpdateHymnDto): Promise<CreateHymnDto> {
    return this.HymnsService.toUpdate(id, hymn)
  }

  // @Get('/changedatabase')
  // async getChangeDataBase() {
  //   return this.HymnsService.getChangeDataBase()
  // }

}
