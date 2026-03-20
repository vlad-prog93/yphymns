import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { HymnEditsService } from 'src/hymn-edits/hymn-edits.service';
import { UpdateHymnDto } from 'src/hymns/dto/update-hymn.dto';

@Controller('api/hymn-edits')
export class HymnEditsController {
  constructor(private readonly hymnEditsService: HymnEditsService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createEdit(
    @Body() dto: UpdateHymnDto,
    @Req() req: any
  ) {
    return this.hymnEditsService.createEdit(dto._id, dto, req.user);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  @Roles('admin')
  getAllEditHymns() {
    return this.hymnEditsService.getAllEditHymns();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Patch(':id/approve')
  approveEdit(@Param('id') id: string) {
    return this.hymnEditsService.approveEdit(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Patch(':id/reject')
  rejectEdit(@Param('id') id: string) {
    return this.hymnEditsService.rejectEdit(id);
  }

}
