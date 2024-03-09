import { Injectable, NotFoundException } from '@nestjs/common';
import { ContentRepo } from './content.repo';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { FilterContentDto } from './dto/filter-content.dto';

@Injectable()
export class ContentService {
  constructor(private contentRepo: ContentRepo) {}
  async index(query: FilterContentDto) {
    return await this.contentRepo.findAll(query);
  }

  async show(id: number) {
    return await this.contentRepo.findOne(id);
  }

  async create(payload: CreateContentDto) {
    return await this.contentRepo.createOne(payload);
  }

  async update(id: number, payload: UpdateContentDto) {
    const content = await this.show(id);
    if (!content) {
      throw new NotFoundException('Not found content with id: ' + id);
    }
    return await this.contentRepo.updateOne(id, payload);
  }

  async delete(id: number) {
    const content = await this.show(id);
    if (!content) {
      throw new NotFoundException('Not found content with id: ' + id);
    }
    return await this.contentRepo.deleteOne(id);
  }
}
