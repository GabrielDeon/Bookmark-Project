import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserBookDto } from './dto/create-user-book.dto';
import { UpdateUserBookDto } from './dto/update-user-book.dto';

@Injectable()
export class UserBookService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserBook(id: string) {
    let userBook = null;
    try {
      userBook = await this.prisma.userBook.findUnique({
        where: { id: id, deleted_at: null },
      });
    } catch (error) {
      console.error('Error fetching user book:', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching user book.',
      );
    }

    if (userBook === null) throw new NotFoundException('User book not found!');

    return userBook;
  }

  async createUserBook(userBookData: CreateUserBookDto) {
    try {
      // First verify that both user and book exist
      const [user, book] = await Promise.all([
        this.prisma.user.findUnique({
          where: { id: userBookData.user_id, deleted_at: null },
        }),
        this.prisma.book.findUnique({
          where: { id: userBookData.book_id, deleted_at: null },
        }),
      ]);

      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (!book) {
        throw new NotFoundException('Book not found');
      }

      return await this.prisma.userBook.create({
        data: {
          begin_at: userBookData.begin_at,
          status: userBookData.status,
          total_number_pages: +userBookData.total_number_pages,
          obs: userBookData.obs,
          user: {
            connect: { id: userBookData.user_id },
          },
          book: {
            connect: { id: userBookData.book_id },
          },
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(`Error creating a new user book: ${error.message}`);
      throw new InternalServerErrorException(
        'Failed to create a new user book!',
      );
    }
  }

  async updateUserBook(id: string, updatedUserBook: UpdateUserBookDto) {
    try {
      return await this.prisma.userBook.update({
        where: { id: id },
        data: updatedUserBook,
      });
    } catch (error) {
      console.error(`Error while updating a user book: ${error.message}`);
      throw new InternalServerErrorException('Failed to update a user book!');
    }
  }

  async softDeleteUserBook(id: string) {
    try {
      return await this.prisma.userBook.update({
        where: { id: id },
        data: { deleted_at: new Date() },
      });
    } catch (error) {
      console.error(`Error soft-deleting a user book: ${error.message}`);
      throw new InternalServerErrorException(
        'Failed to soft-delete a user book!',
      );
    }
  }

  async deleteUserBook(id: string) {
    try {
      return await this.prisma.userBook.delete({ where: { id: id } });
    } catch (error) {
      console.error(`Error hard-deleting a user book: ${error.message}`);
      throw new InternalServerErrorException(
        'Failed to hard-delete a user book!',
      );
    }
  }
}
