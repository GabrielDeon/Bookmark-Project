import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDate,
  IsEnum,
} from 'class-validator';

enum Rating {
  ONE = 'ONE',
  ONE_HALF = 'ONE_HALF',
  TWO = 'TWO',
  TWO_HALF = 'TWO_HALF',
  THREE = 'THREE',
  THREE_HALF = 'THREE_HALF',
  FOUR = 'FOUR',
  FOUR_HALF = 'FOUR_HALF',
  FIVE = 'FIVE',
}

export class CreateBookReviewDto {
  @IsString()
  @IsNotEmpty()
  review: string;

  @IsEnum(Rating)
  @IsOptional()
  rating?: Rating;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  book_id: string;

  @IsOptional()
  @IsDate()
  deleted_at?: Date;
}
