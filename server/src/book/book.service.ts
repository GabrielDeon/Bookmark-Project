import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async findBook(id: string) {
    let book = null;
    try {
      book = await this.prisma.book.findUnique({
        where: { id: id, deleted_at: null },
        include: {
          mainCategory: true,
          subCategory: true,
        },
      });
    } catch (error) {
      console.error('Error fetching book:', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching book.',
      );
    }

    if (book === null) throw new NotFoundException('Book not found!');

    return book;
  }

  async createBook(bookData: CreateBookDto, bookImage?: Express.Multer.File) {
    let imageUrl: string | undefined;

    if (bookImage) {
      let uploadPath = path.join(__dirname, '..', '..', 'Books', 'Image');

      if (uploadPath.includes('dist')) {
        uploadPath = uploadPath.replace('dist', '');
      }

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      // Handle single image file
      const filePath = path.join(uploadPath, bookImage.originalname);
      fs.writeFileSync(filePath, bookImage.buffer);
      imageUrl = bookImage.originalname;
    }

    try {
      // First verify if the main category exists
      const mainCategory = await this.prisma.bookCategory.findUnique({
        where: { id: bookData.categoryId }
      });

      if (!mainCategory) {
        throw new NotFoundException(`Main category with ID ${bookData.categoryId} not found`);
      }

      // If subCategoryId is provided, verify it exists
      if (bookData.subCategoryId) {
        const subCategory = await this.prisma.bookCategory.findUnique({
          where: { id: bookData.subCategoryId }
        });

        if (!subCategory) {
          throw new NotFoundException(`Sub category with ID ${bookData.subCategoryId} not found`);
        }
      }

      // Create book with image and category connections
      return await this.prisma.book.create({
        data: {
          title: bookData.title,
          author: bookData.author,
          ...(imageUrl && { image: imageUrl }),
          mainCategory: {
            connect: { id: bookData.categoryId }
          },
          subCategory: bookData.subCategoryId ? {
            connect: { id: bookData.subCategoryId }
          } : undefined,
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(`Error creating a new book: ${error.message}`);
      throw new InternalServerErrorException('Failed to create a new book!');
    }
  }

  async updateBook(id: string, bookData: UpdateBookDto) {
    console.log(id);
        
    try {
      return await this.prisma.book.update({
        where: {
          id: id,
        },
        data: bookData,
      });
    } catch (error) {
      console.error(`Error while updating a book: ${error.message}`);
      throw new InternalServerErrorException('Failed to update a book!');
    }
  }

  async softDeleteBook(id: string) {
    try {
      return await this.prisma.book.update({
        where: { id: id },
        data: { deleted_at: new Date() },
      });
    } catch (error) {
      console.error(`Error soft-deleting a book: ${error.message}`);
      throw new InternalServerErrorException('Failed to soft-delete a book!');
    }
  }

  async deleteBook(id: string) {
    try {
      return await this.prisma.book.delete({ where: { id: id } });
    } catch (error) {
      console.error(`Error hard-deleting a book: ${error.message}`);
      throw new InternalServerErrorException('Failed to hard-delete a book!');
    }
  }
}
