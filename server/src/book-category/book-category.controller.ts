import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { BookCategoryService } from './book-category.service';
import { CreateBookCategoryDto } from './dto/create-book-category.dto';
import { UpdateBookCategoryDto } from './dto/update-book-category.dto';

@Controller('book-category')
export class BookCategoryController {
  constructor(private readonly bookCategoryService: BookCategoryService) {}

  @Get(':id')
  findBookCategory(@Param('id') id: string) {
    return this.bookCategoryService.findBookCategory(id);
  }

  @Post()
  createBookCategory(
    @Body(ValidationPipe) createBookCategoryDto: CreateBookCategoryDto,
  ) {
    return this.bookCategoryService.createBookCategory(createBookCategoryDto);
  }

  @Patch(':id')
  updateBookCategory(
    @Param('id') id: string,
    @Body() bookCategoryUpdate: UpdateBookCategoryDto,
  ) {
    return this.bookCategoryService.updateBookCategory(id, bookCategoryUpdate);
  }

  @Patch(':id')
  softDeleteBookCategory(@Param('id') id: string) {
    return this.bookCategoryService.softDeleteBookCategory(id);
  }

  @Delete(':id')
  deleteBookCategory(@Param('id') id: string) {
    return this.bookCategoryService.deleteBookCategory(id);
  }
}
