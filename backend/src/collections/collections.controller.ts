import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';

// import сервисов
import { CollectionsService } from 'src/collections/collecrions.service';
import { HymnsService } from 'src/hymns/hymns.service';

// import типов и интерфейсов
import { createColDTO } from 'src/collections/dto/req/create-col.dto';
import { updateColDTO } from 'src/collections/dto/req/update-col.dto';
import { ICollection } from 'src/collections/dto/types';

@Controller('api/collections')
export class CollectionsController {
  constructor(
    private CollectionsService: CollectionsService,
  ) { }


  @Get()
  getAll(): Promise<ICollection[]> {
    return this.CollectionsService.getAll()
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<ICollection> {
    return this.CollectionsService.getOne(id)
  }

  @Post()
  create(@Body() dto: createColDTO): Promise<ICollection> {
    return this.CollectionsService.create(dto)
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() dto: updateColDTO): Promise<ICollection> {
    return this.CollectionsService.update(id, dto)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ICollection> {
    return this.CollectionsService.delete(id)
  }
}
