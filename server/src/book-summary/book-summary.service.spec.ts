import { Test, TestingModule } from '@nestjs/testing';
import { BookSummaryService } from './book-summary.service';

describe('BookSummaryService', () => {
  let service: BookSummaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookSummaryService],
    }).compile();

    service = module.get<BookSummaryService>(BookSummaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
