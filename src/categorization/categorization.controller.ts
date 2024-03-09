import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCategorizationDto } from './dto/create-categorization';
import { CategorizationService } from './categorization.service';
import { UpdateCategorizationDto } from './dto/update-categorization';

@ApiTags('Categorization')
@Controller({ path: 'categorization', version: '1' })
export class CategorizationController {
  constructor(private categorizationService: CategorizationService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categorizations' })
  async index() {
    return await this.categorizationService.index();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one categorization' })
  async get(@Param('id') id: number) {
    return await this.categorizationService.get(id);
  }

  @Post()
  @ApiOperation({ summary: 'Assign a content to a category' })
  async create(@Body() payload: CreateCategorizationDto) {
    return await this.categorizationService.create(payload);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update one categorization' })
  async update(
    @Param('id') id: number,
    @Body() payload: UpdateCategorizationDto,
  ) {
    return await this.categorizationService.update(id, payload);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete one categorization' })
  async delete(@Param('id') id: number) {
    return await this.categorizationService.delete(id);
  }
}
