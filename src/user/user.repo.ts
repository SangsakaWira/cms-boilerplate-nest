import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { FilterUserDto } from './dto/filter-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepo {
  constructor(private prisma: PrismaService) {}

  async getAll(query: FilterUserDto) {
    const pagination = this.createPagination(query);
    const whereCondition = this.createFilter(query);
    const sortCondition = this.createSort(query);

    const users = await this.prisma.user.findMany({
      where: whereCondition,
      skip: pagination.skip,
      take: pagination.limitNumber,
      orderBy: sortCondition,
    });

    const totalData = await this.getTotal(query);
    const totalPages = Math.ceil(totalData / pagination.limitNumber);

    return { users, pagination, totalData, totalPages };
  }

  async get(id: number) {
    const user = await this.prisma.user.findFirst({
      where: { id },
    });
    return { user };
  }

  async getTotal(query: FilterUserDto) {
    const whereCondition = this.createFilter(query);

    return await this.prisma.user.count({
      where: whereCondition,
    });
  }

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        username: createUserDto.username,
        password: await bcrypt.hash(createUserDto.password, 10),
      },
    });
  }

  /**
   * Checks if the provided email from CreateUserDto is unique in the database.
   * @param createUserDto - An object containing the email to be checked.
   * @returns  A promise that resolves to
   * `true` if the email is unique (not found in the database),
   * `false` otherwise (email is already used by another user).
   */
  async isEmailUnique(createUserDto: CreateUserDto) {
    const userExisting = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    return !userExisting;
  }

  async destroy(id: number) {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async update(updateUserDto: UpdateUserDto, id: number) {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  // Helper
  createPagination(query: FilterUserDto) {
    const { page, limit } = query;
    const pageNumber = page || 1;
    const limitNumber = limit || 10;
    const skip = (pageNumber - 1) * limitNumber;

    return { pageNumber, limitNumber, skip };
  }

  createFilter(query: FilterUserDto) {
    const { email, username } = query;
    const filterCondition = {};
    if (email) {
      filterCondition['email'] = {
        contains: email,
        mode: 'insensitive',
      };
    }

    if (username) {
      filterCondition['username'] = {
        name: {
          contains: username,
          mode: 'insensitive',
        },
      };
    }

    return filterCondition;
  }

  createSort(query: FilterUserDto) {
    const sortCondition = {};

    if (query.sort) {
      const isDescending = query.sort.startsWith('-');
      let fieldName: string;

      if (isDescending) {
        fieldName = query.sort.substring(1);
      } else {
        fieldName = query.sort;
      }

      const allowedFields = [
        'name',
        'birth_date',
        'join_date',
        'site',
        'created_at',
        'updated_at',
      ];
      if (allowedFields.includes(fieldName)) {
        sortCondition[fieldName] = isDescending
          ? Prisma.SortOrder.desc
          : Prisma.SortOrder.asc;
      }
    }

    return sortCondition;
  }
}
