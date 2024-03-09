import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepo } from './user.repo';
import { FilterUserDto } from './dto/filter-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo) {}

  async index(query: FilterUserDto) {
    return await this.userRepo.getAll(query);
  }

  async show(id: number) {
    const user = await this.userRepo.get(id);
    if (!user) {
      throw new NotFoundException(`user with id: ${id} is not found`);
    }
    return user;
  }

  async store(payload: CreateUserDto) {
    return await this.userRepo.create(payload);
  }

  async delete(id: number) {
    await this.show(id);
    return await this.userRepo.destroy(id);
  }

  async update(payload: UpdateUserDto, id: number) {
    await this.show(id);
    return await this.userRepo.update(payload, id);
  }

  async getUserByEmail(email: string) {
    return await this.userRepo.findUserByEmail(email);
  }
}
