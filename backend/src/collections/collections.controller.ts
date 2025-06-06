import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CollectionsService } from 'src/collections/collecrions.service';
import { CreateCollectionDto } from 'src/collections/dto/create-collection.dto';

@Controller('api/collections')
export class CollectionsController {
  constructor(private CollectionsService: CollectionsService) { }


  @Get()
  getAll() {
    // return this.CollectionsService.getAll()
    return 'получишь все сборники в виде: объекта: {сборник1: {name:"...", hymns:[id, id, id, id ]}}'
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return `получишь один сборник ${id}`
  }

  @Post()
  create(@Body() dto: CreateCollectionDto) {
    return this.CollectionsService.create(dto)
  }

  @Patch(':id')
  updateOne(@Param('id') param: string, @Body() dto: CreateCollectionDto) {
    // return this.CollectionsService.create(dto)
    return `редактируешь сборник ${param},${dto}`
  }
}
