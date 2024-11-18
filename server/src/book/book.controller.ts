import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get(':id')
  findBook(@Param('id') id: string) {
    return this.bookService.findBook(id);
  }

  @Get()
  findAllBooks(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 16,
    @Query('filter') filter: string = 'none',
    @Query('sortOrder') sortOrder: string = 'asc',
    @Query('categoryId') categoryId: string = 'none',
  ) {
    return this.bookService.findAllBooks(
      page,
      perPage,
      filter,
      sortOrder,
      categoryId,
    );
  }

  @Post()
  @UseInterceptors(FileInterceptor('images'))
  createBook(
    @Body(ValidationPipe) createBookDto: CreateBookDto,
    @UploadedFile() bookImage?: Express.Multer.File
  ) {
    if (bookImage) {
      const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedImageTypes.includes(bookImage.mimetype)) {
        throw new BadRequestException(`Invalid file type: ${bookImage.mimetype}`);
      }
    }

    return this.bookService.createBook(createBookDto, bookImage);
  }

  @Patch(':id')
  updateBook(@Param('id') id: string, @Body() bookUpdate: UpdateBookDto) {
    return this.bookService.updateBook(id, bookUpdate);
  }

  @Patch(':id/soft-delete')
  softDeleteBook(@Param('id') id: string) {
    return this.bookService.softDeleteBook(id);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }
}
