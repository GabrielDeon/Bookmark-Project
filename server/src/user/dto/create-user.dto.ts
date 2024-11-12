import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  
  @IsOptional()
  @IsDate()
  deleted_at;
}
