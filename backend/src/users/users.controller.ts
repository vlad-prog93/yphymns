import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { RegisterDTO } from 'src/users/dto/register.dto';
import { CreateUserResponse } from 'src/users/res/CreateUserResponse';
import { GetAllUsersResponse, IUser } from 'src/users/res/GetAllUsersResponse';
import { DeleteUserResponse } from 'src/users/res/DeleteUserResponse';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() dto: RegisterDTO): Promise<CreateUserResponse> {
    return this.usersService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  @Roles('admin')
  getAllUsers(): Promise<GetAllUsersResponse> {
    return this.usersService.getAllUsers();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete('user/:id')
  @Roles('admin')
  deleteUser(@Param('id') id: string, @Req() req: any): Promise<DeleteUserResponse> {
    return this.usersService.deleteUser(id, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/:id')
  getUser(@Param('id') id: string, @Req() req: any): Promise<IUser> {
    return this.usersService.getById(req.user, id);
  }

  @Post('reset-password')
  resetPassword(@Body() dto: RegisterDTO): Promise<{ message: string }> {
    return this.usersService.resetPassword(dto);
  }
}
