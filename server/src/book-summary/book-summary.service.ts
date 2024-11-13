import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookSummaryDto } from './dto/create-book-summary.dto';
import { UpdateBookSummaryDto } from './dto/update-book-summary.dto';

@Injectable()
export class BookSummaryService {
  constructor(private readonly prisma: PrismaService) {}

  async findBookSummary(id: string) {
    let bookSummary = null;
    try {
      bookSummary = await this.prisma.bookSummary.findUnique({
        where: { id: id, deleted_at: null },
      });
    } catch (error) {
      console.error('Error fetching book summary:', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching book summary.',
      );
    }

    if (bookSummary === null) throw new NotFoundException('Book summary not found!');

    return bookSummary;
  }

  async createBookSummary(bookSummaryData: CreateBookSummaryDto) {
    try {
      // First verify that both user and book exist
      const [user, book] = await Promise.all([
        this.prisma.user.findUnique({
          where: { id: bookSummaryData.user_id, deleted_at: null },
        }),
        this.prisma.book.findUnique({
          where: { id: bookSummaryData.book_id, deleted_at: null },
        }),
      ]);

      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (!book) {
        throw new NotFoundException('Book not found');
      }

      return await this.prisma.bookSummary.create({
        data: {          
          content: bookSummaryData.content,
          user: {
            connect: { id: bookSummaryData.user_id }
          },
          book: {
            connect: { id: bookSummaryData.book_id }
          },
        },
        include: {          
          book: true,
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(`Error creating a new book summary: ${error.message}`);
      throw new InternalServerErrorException('Failed to create a new book summary!');
    }
  }

  async updateBookSummary(id: string, updatedBookSummary: UpdateBookSummaryDto) {
    try {
      return await this.prisma.bookSummary.update({
        where: { id: id },
        data: updatedBookSummary,
      });
    } catch (error) {
      console.error(`Error while updating a book summary: ${error.message}`);
      throw new InternalServerErrorException('Failed to update a book summary!');
    }
  }

  async softDeleteBookSummary(id: string) {
    try {
      return await this.prisma.bookSummary.update({
        where: { id: id },
        data: { deleted_at: new Date() },
      });
    } catch (error) {
      console.error(`Error soft-deleting a book summary: ${error.message}`);
      throw new InternalServerErrorException('Failed to soft-delete a book summary!');
    }
  }

  async deleteBookSummary(id: string) {
    try {
      return await this.prisma.bookSummary.delete({ where: { id: id } });
    } catch (error) {
      console.error(`Error hard-deleting a book summary: ${error.message}`);
      throw new InternalServerErrorException('Failed to hard-delete a book summary!');
    }
  }
}
