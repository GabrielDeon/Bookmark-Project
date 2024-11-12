import {
  IsDate,  
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsOptional()
  @IsDate()
  deleted_at;

  @IsString()
  categoryId: string;

  @IsOptional()
  @IsString()
  subCategoryId: string;

  @IsOptional()
  @IsString()
  image;
}
