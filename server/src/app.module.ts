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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),    
    UserModule,
    PrismaModule,
    AuthModule,
    BookModule,
    BookCategoryModule,
    BookSummaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
