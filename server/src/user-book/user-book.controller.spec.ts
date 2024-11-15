import { Test, TestingModule } from '@nestjs/testing';
import { UserBookController } from './user-book.controller';

describe('UserBookController', () => {
  let controller: UserBookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBookController],
    }).compile();

    controller = module.get<UserBookController>(UserBookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
