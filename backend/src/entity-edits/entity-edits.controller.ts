import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateEntityEditDto } from 'src/entity-edits/dto/entity-edits.dto';
import { EntityEditsService } from 'src/entity-edits/entity-edits.service';

@Controller('api/entity-edits')
export class EntityEditsController {
  constructor(private readonly entityEditsService: EntityEditsService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createEdit(
    @Body() dto: CreateEntityEditDto,
    @Req() req: any
  ) {
    return this.entityEditsService.createEdit(dto, req.user);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  @Roles('admin')
  getAllEditEntity() {
    return this.entityEditsService.getAllEditEntity();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Patch(':id/approve')
  approveEdit(@Param('id') id: string) {
    return this.entityEditsService.approveEdit(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Patch(':id/reject')
  rejectEdit(@Param('id') id: string) {
    return this.entityEditsService.rejectEdit(id);
  }

}
