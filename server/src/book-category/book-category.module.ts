import { Module } from '@nestjs/common';
import { BookCategoryController } from './book-category.controller';
import { BookCategoryService } from './book-category.service';

@Module({
  controllers: [BookCategoryController],
  providers: [BookCategoryService]
})
export class BookCategoryModule {}
