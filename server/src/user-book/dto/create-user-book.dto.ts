import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDate,
  IsEnum,
  IsInt,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

enum BookStatus {
  READING = 'READING',
  READ = 'READ',
  TO_READ = 'TO_READ',
}

export class CreateUserBookDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  book_id: string;

  @IsEnum(BookStatus)
  @IsNotEmpty()
  status: BookStatus;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  begin_at: Date;

  @IsDate()  
  @IsOptional()
  finished_at: Date;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  total_number_pages: number;

  @IsString()
  @IsOptional()
  obs?: string;

  @IsOptional()
  @IsDate()
  deleted_at?: Date;
} 