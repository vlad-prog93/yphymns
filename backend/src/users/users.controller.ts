import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body('email') email: string) {
    return this.usersService.create(email);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  @Roles('admin')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete('user/:id')
  @Roles('admin')
  deleteUser(@Param('id') id: string, @Req() req: any) {
    return this.usersService.deleteUser(id, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/:id')
  getUser(@Param('id') id: string, @Req() req: any) {
    return this.usersService.getById(req.user, id);
  }

  @Post('reset-password')
  resetPassword(@Body('email') email: string) {
    return this.usersService.resetPassword(email);
  }


}
