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
  UseFilters,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import {
  API_MESSAGES,
  wrapMessage,
} from '@/lib/constants/api-messages.constant';
import {
  HandleException,
  RecipeValidationFilterV2,
} from '@/lib/decorators/handle-exception.decorator';
import { excludeProps } from '@/lib/utils';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseFilters(RecipeValidationFilterV2)
  async create(@Body() dto: CreateRecipeDto) {
    const recipe = await this.recipesService.create(dto);
    return wrapMessage(API_MESSAGES.CREATE_SUCCESS, recipe, 'single');
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @HandleException()
  async findAll() {
    const recipes = await this.recipesService.findAll();
    if (!recipes.length) {
      return { message: API_MESSAGES.EMPTY, recipes: [] };
    }
    recipes.forEach((recipe) => {
      recipe.cost = recipe.cost.toString() as any;
      if (recipe.created_at) delete recipe.created_at;
      if (recipe.updated_at) delete recipe.updated_at;
    });
    const d = wrapMessage(API_MESSAGES.GET_ALL_SUCCESS, recipes, 'list');
    return d;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @HandleException(() => ({ message: API_MESSAGES.GET_BY_ID_NOT_FOUND }))
  async findOne(@Param('id') id: string) {
    const recipe = await this.recipesService.findOne(+id);
    if (!recipe)
      return { message: API_MESSAGES.GET_BY_ID_NOT_FOUND, recipe: [] };
    recipe.cost = recipe.cost.toString() as any;
    const r = excludeProps(recipe, ['created_at', 'updated_at']);
    const d = wrapMessage(API_MESSAGES.GET_BY_ID_SUCCESS, r, 'single');
    return d;
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @HandleException(() => ({ message: API_MESSAGES.GET_BY_ID_NOT_FOUND }))
  async update(@Param('id') id: string, @Body() dto: UpdateRecipeDto) {
    const recipe = await this.recipesService.update(+id, dto);
    recipe.cost = recipe.cost.toString() as any;
    const r = excludeProps(recipe, ['id', 'created_at', 'updated_at']);
    const d = wrapMessage(API_MESSAGES.UPDATE_SUCCESS, r, 'single');
    return d;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @HandleException(() => ({ message: API_MESSAGES.DELETE_NOT_FOUND }))
  async remove(@Param('id') id: string) {
    const recipe = await this.recipesService.remove(+id);
    const d = wrapMessage(API_MESSAGES.DELETE_SUCCESS, recipe);
    const n = excludeProps(d, ['recipes', 'recipe']);
    return n;
  }
}
