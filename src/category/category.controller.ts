import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FilterCategoryDto } from './dto/filter-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';

@ApiTags('Category')
@Controller({ path: 'category', version: '1' })
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  async index(@Query() query: FilterCategoryDto) {
    const data = await this.categoryService.index(query);
    return {
      data: data.categories,
      meta: {
        page: {
          current_page: data.pagination.pageNumber,
          total_pages: data.totalPages,
          total_data: data.totalData,
        },
      },
    };
  }

  @Get(':id')
  async show(@Param('id') id: number) {
    return await this.categoryService.show(id);
  }

  @Post()
  async create(@Body() payload: CreateCategoryDto) {
    return await this.categoryService.create(payload);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() payload: UpdateCategoryDto) {
    return await this.categoryService.update(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.categoryService.delete(id);
  }
}
