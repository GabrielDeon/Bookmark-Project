import { CreateBookReviewDto } from './create-book-review.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateBookReviewDto extends PartialType(CreateBookReviewDto) {}
