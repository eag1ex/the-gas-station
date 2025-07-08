import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateRecipeDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  making_time: string;

  @IsNotEmpty()
  @IsString()
  serves: string;

  @IsNotEmpty()
  @IsString()
  ingredients: string;

  @IsNotEmpty()
  @IsNumber()
  cost: number;
}
