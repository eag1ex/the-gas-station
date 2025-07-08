import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class RecipesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRecipeDto) {
    return this.prisma.recipe.create({ data });
  }

  async findAll() {
    return this.prisma.recipe.findMany();
  }

  async findOne(id: number) {
    return this.prisma.recipe.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateRecipeDto) {
    try {
      return await this.prisma.recipe.update({ where: { id }, data });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Recipe with ID ${id} not found.`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.recipe.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Recipe with ID ${id} not found.`);
      }
      throw error;
    }
  }
}
