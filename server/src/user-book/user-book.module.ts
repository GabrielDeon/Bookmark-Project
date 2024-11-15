import { Module } from '@nestjs/common';
import { UserBookController } from './user-book.controller';
import { UserBookService } from './user-book.service';

@Module({
  controllers: [UserBookController],
  providers: [UserBookService]
})
export class UserBookModule {}
