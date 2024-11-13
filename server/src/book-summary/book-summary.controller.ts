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
import { BookSummaryService } from './book-summary.service';
import { CreateBookSummaryDto } from './dto/create-book-summary.dto';
import { UpdateBookSummaryDto } from './dto/update-book-summary.dto';

@Controller('book-summary')
export class BookSummaryController {
  constructor(private readonly bookSummaryService: BookSummaryService) {}

  @Get(':id')
  findBookSummary(@Param('id') id: string) {
    return this.bookSummaryService.findBookSummary(id);
  }

  @Post()
  createBookSummary(
    @Body(ValidationPipe) createBookSummaryDto: CreateBookSummaryDto,
  ) {
    return this.bookSummaryService.createBookSummary(createBookSummaryDto);
  }

  @Patch(':id')
  updateBookSummary(
    @Param('id') id: string,
    @Body() bookSummaryUpdate: UpdateBookSummaryDto,
  ) {
    return this.bookSummaryService.updateBookSummary(id, bookSummaryUpdate);
  }

  @Patch(':id/soft-delete')
  softDeleteBookSummary(@Param('id') id: string) {
    return this.bookSummaryService.softDeleteBookSummary(id);
  }

  @Delete(':id')
  deleteBookSummary(@Param('id') id: string) {
    return this.bookSummaryService.deleteBookSummary(id);
  }
}
