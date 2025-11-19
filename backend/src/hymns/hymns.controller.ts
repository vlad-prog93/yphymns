<<<<<<< HEAD
import { Controller, Get, Post, Body, Param, Delete, Patch, StreamableFile, UseInterceptors, UploadedFile, Ip } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { writeFileSync, createReadStream, readFileSync } from 'fs'
import mongoose from 'mongoose';
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
    const data = await this.HymnsService.getAll()
    writeFileSync('db.json', JSON.stringify(data, null, 4), { flag: 'w', encoding: 'utf8' })
    const file = createReadStream('db.json', 'utf8')
    return new StreamableFile(file)
  }

  @ApiOperation({ summary: 'Получение одного гимна' })
  @ApiResponse({ status: 200, description: 'в json формате передается гимн', type: CreateHymnDto })
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.HymnsService.getOne(id)
  }

  @ApiOperation({ summary: 'Создание гимна' })
  @ApiResponse({ status: 201, description: 'в ответе созданный гимн в формате json' })
  @Post()
  add(@Body() createHymnDto: CreateHymnDto) {
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
  @UseInterceptors(FileInterceptor('file'))
  @Post('/database')
  addFile(@UploadedFile() file) {
    try {

      const hymns = JSON.parse(file.buffer.toString()).map(hymn => {
        hymn._id && delete hymn._id
        hymn.id && delete hymn.id
        return hymn
      })
      hymns.forEach((hymn: CreateHymnDto) => {
        this.HymnsService.create(hymn)
      });
      return this.HymnsService.getAll()
    } catch (error) {
      return error
    }
  }


  @ApiOperation({ summary: 'Удаление гимна' })
  @ApiResponse({ status: 201, description: 'в ответе id гимна', schema: { type: 'string' } })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const hymn = await this.HymnsService.delete(id)
    return hymn._id
  }

  @ApiOperation({ summary: 'Удаление всех гимнов' })
  @ApiResponse({ status: 201, description: 'в ответе { acknowledged: true, deletedCount: X }' })
  @Delete('/deleteall')
  async deleteAll() {
    const hymns = await this.HymnsService.deleteAll()
    return hymns
  }



  @ApiOperation({ summary: 'Изменение гимна' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 201, description: 'в ответе измененный гимн в формате json', type: UpdateHymnDto })
  @Patch(':id')
  async update(@Param() id: string, @Body() hymn: UpdateHymnDto) {
    const updatedHymn = await this.HymnsService.toUpdate(hymn)
    return updatedHymn
  }

}
=======
import { Controller, Get, Post, Body, Param, Delete, Patch, StreamableFile, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFileSync, createReadStream, readFileSync } from 'fs'
import { CreateHymnDto } from 'src/hymns/dto/create-hymn.dto';
import { UpdateHymnDto } from 'src/hymns/dto/update-hymn.dto';
import { HymnsService } from 'src/hymns/hymns.service';

@Controller('api/hymns')
export class HymnsController {
  constructor(private HymnsService: HymnsService) { }

  @Get()
  getAll() {
    return this.HymnsService.getAll()
  }

  @Get('/database')
  async getDataBase() {
    const data = await this.HymnsService.getAll()
    writeFileSync('db.json', JSON.stringify(data, null, 4), { flag: 'w', encoding: 'utf8' })
    const file = createReadStream('db.json', 'utf8')
    return new StreamableFile(file)
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.HymnsService.getOne(id)
  }

  @Post()
  add(@Body() createHymnDto: CreateHymnDto) {
    return this.HymnsService.create(createHymnDto)
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('/database')
  addFile(@UploadedFile() file) {
    try {

      const hymns = JSON.parse(file.buffer.toString()).map(hymn => {
        hymn._id && delete hymn._id
        hymn.id && delete hymn.id
        return hymn
      })
      hymns.forEach((hymn: CreateHymnDto) => {
        this.HymnsService.create(hymn)
      });
      return this.HymnsService.getAll()
    } catch (error) {
      return error
    }
  }

  @Delete()
  async delete(@Body() id: string) {
    console.log(id)
    const hymn = await this.HymnsService.delete(id)
    return hymn._id
  }

  @Patch()
  async update(@Body() hymn: UpdateHymnDto) {
    const updatedHymn = await this.HymnsService.toUpdate(hymn)
    return updatedHymn
  }

}
>>>>>>> 189614972aa82f4d474c2598fff16f5afdb90c02
