import { Test, TestingModule } from '@nestjs/testing';
import { BookCategoryController } from './book-category.controller';

describe('BookCategoryController', () => {
  let controller: BookCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookCategoryController],
    }).compile();

    controller = module.get<BookCategoryController>(BookCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
