import { CreateBookCategoryDto } from './create-book-category.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateBookCategoryDto extends PartialType(CreateBookCategoryDto) {}
