import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookCategoryDto } from './dto/create-book-category.dto';
import { UpdateBookCategoryDto } from './dto/update-book-category.dto';

@Injectable()
export class BookCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findBookCategory(id: string) {
    let bookCategory = null;
    try {
      bookCategory = await this.prisma.bookCategory.findUnique({
        where: { id: id, deleted_at: null },
      });
    } catch (error) {
      console.error('Error fetching book category:', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching book category.',
      );
    }

    if (bookCategory === null) throw new NotFoundException('Book category not found!');

    return bookCategory;
  }

  async createBookCategory(bookCategoryData: CreateBookCategoryDto) {
    try {
      return await this.prisma.bookCategory.create({ data: bookCategoryData });
    } catch (error) {
      console.error(`Error creating a new book category: ${error.message}`);
      throw new InternalServerErrorException('Failed to create a new book category!');
    }
  }

  async updateBookCategory(id: string, updatedBookCategory: UpdateBookCategoryDto) {
    try {
      return await this.prisma.bookCategory.update({
        where: { id: id },
        data: updatedBookCategory,
      });
    } catch (error) {
      console.error(`Error while updating a book category: ${error.message}`);
      throw new InternalServerErrorException('Failed to update a book category!');
    }
  }

  async softDeleteBookCategory(id: string) {
    try {
      return await this.prisma.bookCategory.update({
        where: { id: id },
        data: { deleted_at: new Date() },
      });
    } catch (error) {
      console.error(`Error soft-deleting a book category: ${error.message}`);
      throw new InternalServerErrorException('Failed to soft-delete a book category!');
    }
  }

  async deleteBookCategory(id: string) {
    try {
      return await this.prisma.bookCategory.delete({ where: { id: id } });
    } catch (error) {
      console.error(`Error hard-deleting a book category: ${error.message}`);
      throw new InternalServerErrorException('Failed to hard-delete a book category!');
    }
  }
}
