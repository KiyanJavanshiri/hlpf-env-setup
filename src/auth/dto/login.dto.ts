import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Елетронна пошта користувача',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'hgtj_12_pm',
    description: 'Пароль користувача',
  })
  @IsString()
  password: string;
}
