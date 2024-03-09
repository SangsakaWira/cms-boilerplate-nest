import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FilterCategoryDto } from './dto/filter-category.dto';

@Injectable()
export class CategoryRepo {
  constructor(private prisma: PrismaService) {}
  async findAll(query) {
    const pagination = this.createPagination(query);
    const whereCondition = this.createFilter(query);
    const sortCondition = this.createSort(query);

    const categories = await this.prisma.category.findMany({
      where: whereCondition,
      skip: pagination.skip,
      take: pagination.limitNumber,
      orderBy: sortCondition,
    });

    const totalData = await this.countAll(query);
    const totalPages = Math.ceil(totalData / pagination.limitNumber);

    return { categories, pagination, totalData, totalPages };
  }

  async findOne(id: number) {
    return await this.prisma.category.findFirst({
      where: { id: id },
    });
  }

  async createOne(payload: CreateCategoryDto) {
    return await this.prisma.category.create({
      data: payload,
    });
  }

  async updateOne(id: number, payload: UpdateCategoryDto) {
    return await this.prisma.category.update({
      data: payload,
      where: { id: id },
    });
  }

  async deleteOne(id: number) {
    return await this.prisma.category.delete({
      where: { id: id },
    });
  }

  async countAll(query: FilterCategoryDto) {
    const whereCondition = this.createFilter(query);

    return await this.prisma.category.count({
      where: whereCondition,
    });
  }

  // Helper
  createPagination(query: FilterCategoryDto) {
    const { page, limit } = query;
    const pageNumber = page || 1;
    const limitNumber = limit || 10;
    const skip = (pageNumber - 1) * limitNumber;

    return { pageNumber, limitNumber, skip };
  }

  createFilter(query: FilterCategoryDto) {
    const { name } = query;
    const filterCondition = {};
    if (name) {
      filterCondition['name'] = {
        contains: name,
        mode: 'insensitive',
      };
    }

    return filterCondition;
  }

  createSort(query: FilterCategoryDto) {
    const sortCondition = {};

    if (query.sort) {
      const isDescending = query.sort.startsWith('-');
      let fieldName: string;

      if (isDescending) {
        fieldName = query.sort.substring(1);
      } else {
        fieldName = query.sort;
      }

      const allowedFields = ['name', 'created_at', 'updated_at'];
      if (allowedFields.includes(fieldName)) {
        sortCondition[fieldName] = isDescending
          ? Prisma.SortOrder.desc
          : Prisma.SortOrder.asc;
      }
    }

    return sortCondition;
  }
}
