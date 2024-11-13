import { Module } from '@nestjs/common';
import { BookCategoryController } from './book-category.controller';
import { BookCategoryService } from './book-category.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BookCategoryController],
  providers: [BookCategoryService]
})
export class BookCategoryModule {}