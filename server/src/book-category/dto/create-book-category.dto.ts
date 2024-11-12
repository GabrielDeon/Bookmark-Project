import {
    IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookCategoryDto {
  @IsString()
  @IsNotEmpty()
  category_name: string;

  @IsOptional()
  @IsDate()
  deleted_at;
}
