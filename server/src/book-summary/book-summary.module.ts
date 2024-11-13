import { Module } from '@nestjs/common';
import { BookSummaryController } from './book-summary.controller';
import { BookSummaryService } from './book-summary.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [BookSummaryController],
  providers: [BookSummaryService],
  imports: [PrismaModule],
})
export class BookSummaryModule {}
