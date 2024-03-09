/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FilterUserDto } from './dto/filter-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UserRole } from 'src/auth/enum/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  // @Roles(UserRole.ADMIN)
  @Get()
  async index(@Query() query: FilterUserDto) {
    const data = await this.userService.index(query);
    return {
      data: data.users,
      meta: {
        page: {
          current_page: data.pagination.pageNumber,
          total_pages: data.totalPages,
          total_data: data.totalData,
        },
      },
    };
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async show(@Param('id') id: number) {
    const data = await this.userService.show(id);
    return {
      data: data.user,
    };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post()
  async store(@Body() payload: CreateUserDto) {
    return await this.userService.store(payload);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async destroy(@Param('id') id: number) {
    return await this.userService.delete(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(@Body() payload: UpdateUserDto, @Param('id') id: number) {
    return await this.userService.update(payload, id);
  }
}
