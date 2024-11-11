import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(["USER","ADMIN"])
  role: "USER" | "ADMIN";
  created_on;
  deleted_at;
  updated_at;
  UserBook;
  BookSummary;
  BookReview;
}
