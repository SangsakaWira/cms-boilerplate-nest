import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategorizationDto } from './dto/create-categorization';
import { CategorizationRepo } from './categorization.repo';
import { UpdateCategorizationDto } from './dto/update-categorization';

@Injectable()
export class CategorizationService {
  constructor(private categorizationRepo: CategorizationRepo) {}
  async create(payload: CreateCategorizationDto) {
    return this.categorizationRepo.createOne(payload);
  }

  async index() {
    return this.categorizationRepo.findAll();
  }

  async get(id: number) {
    const categorization = this.categorizationRepo.findOne(id);
    if (!categorization) {
      throw new NotFoundException(`Categorzation with id:${id} not found`);
    }
    return;
  }

  async update(id: number, payload: UpdateCategorizationDto) {
    this.get(id);
    return this.categorizationRepo.updateOne(id, payload);
  }

  async delete(id: number) {
    this.get(id);
    return this.categorizationRepo.deleteOne(id);
  }
}
