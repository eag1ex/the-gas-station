import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import {
  API_MESSAGES,
  wrapMessage,
} from '../lib/constants/api-messages.constant';
import { HandleException } from '../lib/decorators/handle-exception.decorator';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @HandleException(() => ({
    message: API_MESSAGES.CREATE_FAILURE,
    required: API_MESSAGES.REQUIRED_FIELDS,
  }))
  async create(@Body() dto: CreateRecipeDto) {
    const recipe = await this.recipesService.create(dto);
    return wrapMessage(API_MESSAGES.CREATE_SUCCESS, recipe);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @HandleException()
  async findAll() {
    const recipes = await this.recipesService.findAll();
    if (!recipes.length) {
      return wrapMessage(API_MESSAGES.EMPTY);
    }
    return wrapMessage(API_MESSAGES.GET_ALL_SUCCESS, recipes);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @HandleException(() => ({ message: API_MESSAGES.GET_BY_ID_NOT_FOUND }))
  async findOne(@Param('id') id: string) {
    const recipe = await this.recipesService.findOne(+id);
    if (!recipe) return { message: API_MESSAGES.GET_BY_ID_NOT_FOUND };
    return wrapMessage(API_MESSAGES.GET_BY_ID_SUCCESS, recipe);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @HandleException(() => ({ message: API_MESSAGES.GET_BY_ID_NOT_FOUND }))
  async update(@Param('id') id: string, @Body() dto: UpdateRecipeDto) {
    const recipe = await this.recipesService.update(+id, dto);
    return wrapMessage(API_MESSAGES.UPDATE_SUCCESS, recipe);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @HandleException(() => ({ message: API_MESSAGES.DELETE_NOT_FOUND }))
  async remove(@Param('id') id: string) {
    const recipe = await this.recipesService.remove(+id);
    return wrapMessage(API_MESSAGES.DELETE_SUCCESS, recipe);
  }
}
