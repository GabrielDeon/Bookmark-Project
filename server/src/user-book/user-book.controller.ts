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
import { UserBookService } from './user-book.service';
import { CreateUserBookDto } from './dto/create-user-book.dto';
import { UpdateUserBookDto } from './dto/update-user-book.dto';

@Controller('user-book')
export class UserBookController {
  constructor(private readonly userBookService: UserBookService) {}

  @Get(':id')
  findUserBook(@Param('id') id: string) {
    return this.userBookService.findUserBook(id);
  }

  @Post()
  createUserBook(
    @Body(ValidationPipe) createUserBookDto: CreateUserBookDto,
  ) {
    return this.userBookService.createUserBook(createUserBookDto);
  }

  @Patch(':id')
  updateUserBook(
    @Param('id') id: string,
    @Body() userBookUpdate: UpdateUserBookDto,
  ) {
    return this.userBookService.updateUserBook(id, userBookUpdate);
  }

  @Patch(':id/soft-delete')
  softDeleteUserBook(@Param('id') id: string) {
    return this.userBookService.softDeleteUserBook(id);
  }

  @Delete(':id')
  deleteUserBook(@Param('id') id: string) {
    return this.userBookService.deleteUserBook(id);
  }
}
