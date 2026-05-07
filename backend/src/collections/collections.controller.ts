import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';

// import сервисов
import { CollectionsService } from 'src/collections/collecrions.service';

// import типов и интерфейсов
import { CreateColDto } from 'src/collections/dto/req/create-col.dto';
import { UpdateColDto } from 'src/collections/dto/req/update-col.dto';
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

  @Get('/collection/:id')
  getOne(@Param('id') id: string): Promise<ICollection> {
    return this.CollectionsService.getOne(id)
  }

  @Post()
  create(@Body() dto: CreateColDto): Promise<ICollection> {
    return this.CollectionsService.create(dto)
  }

  @Patch('/collection/:id')
  editOne(@Param('id') id: string, @Body() dto: UpdateColDto): Promise<ICollection> {
    return this.CollectionsService.editOne(id, dto)
  }

  @Delete('/collection/:id')
  async deleteOne(@Param('id') id: string): Promise<ICollection> {
    return this.CollectionsService.deleteOne(id)
  }

  @Delete('')
  async deleteAll(): Promise<{ acknowledged: boolean, deletedCount: number }> {
    return this.CollectionsService.deleteAll()
  }
}
