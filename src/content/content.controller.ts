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
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateContentDto } from './dto/update-content.dto';
import { FilterContentDto } from './dto/filter-content.dto';

@ApiTags('Content')
@Controller({ path: 'content', version: '1' })
export class ContentController {
  constructor(private contentService: ContentService) {}
  @Get()
  async index(@Query() query: FilterContentDto) {
    const data = await this.contentService.index(query);
    return {
      data: data.contents,
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
    return await this.contentService.show(id);
  }

  @Post()
  async create(@Body() payload: CreateContentDto) {
    return await this.contentService.create(payload);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() payload: UpdateContentDto) {
    return await this.contentService.update(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.contentService.delete(id);
  }
}
