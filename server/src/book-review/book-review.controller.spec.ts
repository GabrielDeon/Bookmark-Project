import { Test, TestingModule } from '@nestjs/testing';
import { BookReviewController } from './book-review.controller';

describe('BookReviewController', () => {
  let controller: BookReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookReviewController],
    }).compile();

    controller = module.get<BookReviewController>(BookReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
