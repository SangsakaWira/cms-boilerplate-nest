import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterCategoryDto } from './dto/filter-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepo } from './category.repo';

@Injectable()
export class CategoryService {
  constructor(private categoryRepo: CategoryRepo) {}
  async index(query: FilterCategoryDto) {
    return await this.categoryRepo.findAll(query);
  }

  async show(id: number) {
    return await this.categoryRepo.findOne(id);
  }

  async create(payload: CreateCategoryDto) {
    return await this.categoryRepo.createOne(payload);
  }

  async update(id: number, payload: UpdateCategoryDto) {
    const category = await this.show(id);
    if (!category) {
      throw new NotFoundException('Not found category with id: ' + id);
    }
    return await this.categoryRepo.updateOne(id, payload);
  }

  async delete(id: number) {
    const category = await this.show(id);
    if (!category) {
      throw new NotFoundException('Not found category with id: ' + id);
    }
    return await this.categoryRepo.deleteOne(id);
  }
}
