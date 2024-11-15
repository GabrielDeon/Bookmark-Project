import { Module } from '@nestjs/common';
import { BookReviewController } from './book-review.controller';
import { BookReviewService } from './book-review.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [BookReviewController],
  providers: [BookReviewService],
  imports: [PrismaModule],
})
export class BookReviewModule {}
