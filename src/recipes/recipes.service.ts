import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Prisma } from '@prisma/client';
import { CatchServiceError } from '@/lib/decorators/handle-exception.decorator';
import { API_MESSAGES } from '@/lib/constants/api-messages.constant';

@Injectable()
export class RecipesService {
  constructor(private readonly prisma: PrismaService) {}

  @CatchServiceError()
  async create(data: CreateRecipeDto) {
    return this.prisma.recipes.create({ data });
  }

  @CatchServiceError()
  async findAll() {
    return this.prisma.recipes.findMany();
  }

  @CatchServiceError()
  async findOne(id: number) {
    return this.prisma.recipes.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateRecipeDto) {
    try {
      return await this.prisma.recipes.update({ where: { id }, data });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Recipe with ID ${id} not found.`);
      }
      Logger.error(`[Service Error] updateRecipe:`, error);
      throw new InternalServerErrorException(API_MESSAGES.SERVICE_FAILURE);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.recipes.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Recipe with ID ${id} not found.`);
      }
      Logger.error(`[Service Error] deleteRecipe:`, error);
      throw new InternalServerErrorException(API_MESSAGES.SERVICE_FAILURE);
    }
  }
}
