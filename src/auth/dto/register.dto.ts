import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Елетронна пошта користувача',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'hgtj_12_pm',
    description: 'Пароль користувача',
    minLength: 8,
    maxLength: 128,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;

  @ApiPropertyOptional({
    example: 'John Doe',
    description: "Ім'я користувача",
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;
}
