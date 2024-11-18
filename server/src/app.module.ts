import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { BookCategoryModule } from './book-category/book-category.module';
import { BookSummaryModule } from './book-summary/book-summary.module';
import { BookReviewModule } from './book-review/book-review.module';
import { UserBookModule } from './user-book/user-book.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),       
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','..', 'Books', 'Image'),
      serveRoot: '/Image',
    }),
    UserModule,
    PrismaModule,
    AuthModule,
    BookModule,
    BookCategoryModule,
    BookSummaryModule,
    BookReviewModule,
    UserBookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
