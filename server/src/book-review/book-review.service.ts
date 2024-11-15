import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookReviewDto } from './dto/create-book-review.dto';
import { UpdateBookReviewDto } from './dto/update-book-review.dto';

@Injectable()
export class BookReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async findBookReview(id: string) {
    let bookReview = null;
    try {
      bookReview = await this.prisma.bookReview.findUnique({
        where: { id: id, deleted_at: null },
      });
    } catch (error) {
      console.error('Error fetching book review:', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching book review.',
      );
    }

    if (bookReview === null) throw new NotFoundException('Book review not found!');

    return bookReview;
  }

  async createBookReview(bookReviewData: CreateBookReviewDto) {
    try {
      // First verify that both user and book exist
      const [user, book] = await Promise.all([
        this.prisma.user.findUnique({
          where: { id: bookReviewData.user_id, deleted_at: null },
        }),
        this.prisma.book.findUnique({
          where: { id: bookReviewData.book_id, deleted_at: null },
        }),
      ]);

      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (!book) {
        throw new NotFoundException('Book not found');
      }

      return await this.prisma.bookReview.create({
        data: {          
          review: bookReviewData.review,
          rating: bookReviewData.rating,          
          user: {
            connect: { id: bookReviewData.user_id }
          },
          book: {
            connect: { id: bookReviewData.book_id }
          },
        }        
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(`Error creating a new book review: ${error.message}`);
      throw new InternalServerErrorException('Failed to create a new book review!');
    }
  }

  async updateBookReview(id: string, updatedBookReview: UpdateBookReviewDto) {
    try {
      return await this.prisma.bookReview.update({
        where: { id: id },
        data: updatedBookReview,
      });
    } catch (error) {
      console.error(`Error while updating a book review: ${error.message}`);
      throw new InternalServerErrorException('Failed to update a book review!');
    }
  }

  async softDeleteBookReview(id: string) {
    try {
      return await this.prisma.bookReview.update({
        where: { id: id },
        data: { deleted_at: new Date() },
      });
    } catch (error) {
      console.error(`Error soft-deleting a book review: ${error.message}`);
      throw new InternalServerErrorException('Failed to soft-delete a book review!');
    }
  }

  async deleteBookReview(id: string) {
    try {
      return await this.prisma.bookReview.delete({ where: { id: id } });
    } catch (error) {
      console.error(`Error hard-deleting a book review: ${error.message}`);
      throw new InternalServerErrorException('Failed to hard-delete a book review!');
    }
  }
}

