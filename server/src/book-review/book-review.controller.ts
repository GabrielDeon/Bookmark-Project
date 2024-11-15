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
import { BookReviewService } from './book-review.service';
import { CreateBookReviewDto } from './dto/create-book-review.dto';
import { UpdateBookReviewDto } from './dto/update-book-review.dto';

@Controller('book-review')
export class BookReviewController {
  constructor(private readonly bookReviewService: BookReviewService) {}

  @Get(':id')
  findBookReview(@Param('id') id: string) {
    return this.bookReviewService.findBookReview(id);
  }

  @Post()
  createBookReview(
    @Body(ValidationPipe) createBookReviewDto: CreateBookReviewDto,
  ) {
    return this.bookReviewService.createBookReview(createBookReviewDto);
  }

  @Patch(':id')
  updateBookReview(
    @Param('id') id: string,
    @Body() bookReviewUpdate: UpdateBookReviewDto,
  ) {
    return this.bookReviewService.updateBookReview(id, bookReviewUpdate);
  }

  @Patch(':id/soft-delete')
  softDeleteBookReview(@Param('id') id: string) {
    return this.bookReviewService.softDeleteBookReview(id);
  }

  @Delete(':id')
  deleteBookReview(@Param('id') id: string) {
    return this.bookReviewService.deleteBookReview(id);
  }
}
