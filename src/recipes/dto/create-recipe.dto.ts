import {
  IsString,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  //@IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  //@IsNotEmpty()
  @MaxLength(100)
  making_time: string;

  @IsString()
  //@IsNotEmpty()
  @MaxLength(100)
  serves: string;

  @IsString()
  //@IsNotEmpty()
  @MaxLength(300)
  ingredients: string;

  // @IsNotEmpty()
  @IsNumber()
  @Min(0)
  cost: number;
}
