import { CreateBookSummaryDto } from './create-book-summary.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateBookSummaryDto extends PartialType(CreateBookSummaryDto) {}
