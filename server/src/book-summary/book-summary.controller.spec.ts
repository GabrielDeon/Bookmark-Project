import { Test, TestingModule } from '@nestjs/testing';
import { BookSummaryController } from './book-summary.controller';

describe('BookSummaryController', () => {
  let controller: BookSummaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookSummaryController],
    }).compile();

    controller = module.get<BookSummaryController>(BookSummaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
