import { Module } from '@nestjs/common';
import { UserBookController } from './user-book.controller';
import { UserBookService } from './user-book.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UserBookController],
  providers: [UserBookService],
  imports: [PrismaModule],
})
export class UserBookModule {}
