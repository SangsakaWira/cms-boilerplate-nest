import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCategorizationDto } from './dto/create-categorization';
import { UpdateCategorizationDto } from './dto/update-categorization';

@Injectable()
export class CategorizationRepo {
  constructor(private prisma: PrismaService) {}
  createOne(payload: CreateCategorizationDto) {
    return this.prisma.categorization.create({
      data: payload,
    });
  }

  findAll() {
    return this.prisma.categorization.findMany();
  }

  findOne(id: number) {
    return this.prisma.categorization.findFirst({
      where: { id },
    });
  }

  async updateOne(id: number, payload: UpdateCategorizationDto) {
    return await this.prisma.categorization.update({
      where: {
        id,
      },
      data: payload,
    });
  }

  deleteOne(id: number) {
    return this.prisma.categorization.delete({
      where: { id },
    });
  }
}
