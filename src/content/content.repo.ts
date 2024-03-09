import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Prisma } from '@prisma/client';
import { FilterContentDto } from './dto/filter-content.dto';

@Injectable()
export class ContentRepo {
  constructor(private prisma: PrismaService) {}
  async findAll(query) {
    const pagination = this.createPagination(query);
    const whereCondition = this.createFilter(query);
    const sortCondition = this.createSort(query);

    const contents = await this.prisma.content.findMany({
      where: whereCondition,
      skip: pagination.skip,
      take: pagination.limitNumber,
      orderBy: sortCondition,
    });

    const totalData = await this.countAll(query);
    const totalPages = Math.ceil(totalData / pagination.limitNumber);

    return { contents, pagination, totalData, totalPages };
  }

  async findOne(id: number) {
    return await this.prisma.content.findFirst({
      where: { id: id },
    });
  }

  async createOne(payload: CreateContentDto) {
    return await this.prisma.content.create({
      data: payload,
    });
  }

  async updateOne(id: number, payload: UpdateContentDto) {
    return await this.prisma.content.update({
      data: payload,
      where: { id: id },
    });
  }

  async deleteOne(id: number) {
    return await this.prisma.content.delete({
      where: { id: id },
    });
  }

  async countAll(query: FilterContentDto) {
    const whereCondition = this.createFilter(query);

    return await this.prisma.content.count({
      where: whereCondition,
    });
  }

  // Helper
  createPagination(query: FilterContentDto) {
    const { page, limit } = query;
    const pageNumber = page || 1;
    const limitNumber = limit || 10;
    const skip = (pageNumber - 1) * limitNumber;

    return { pageNumber, limitNumber, skip };
  }

  createFilter(query: FilterContentDto) {
    const { title, body } = query;
    const filterCondition = {};
    if (title) {
      filterCondition['title'] = {
        contains: title,
        mode: 'insensitive',
      };
    }

    if (body) {
      filterCondition['body'] = {
        contains: body,
        mode: 'insensitive',
      };
    }

    return filterCondition;
  }

  createSort(query: FilterContentDto) {
    const sortCondition = {};

    if (query.sort) {
      const isDescending = query.sort.startsWith('-');
      let fieldName: string;

      if (isDescending) {
        fieldName = query.sort.substring(1);
      } else {
        fieldName = query.sort;
      }

      const allowedFields = ['title', 'body', 'created_at', 'updated_at'];
      if (allowedFields.includes(fieldName)) {
        sortCondition[fieldName] = isDescending
          ? Prisma.SortOrder.desc
          : Prisma.SortOrder.asc;
      }
    }

    return sortCondition;
  }
}
