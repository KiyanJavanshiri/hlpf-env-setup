import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Реєстрація користувача',
  })
  @ApiResponse({
    status: 201,
    description: 'Користувач зареєструвався',
  })
  @ApiResponse({
    status: 400,
    description: 'Помилка валідації',
  })
  @ApiResponse({
    status: 409,
    description: 'Користувач вже зареєстрований',
  })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Логування користувача',
  })
  @ApiResponse({
    status: 200,
    description: 'Користувач залогінився',
  })
  @ApiResponse({
    status: 401,
    description: 'Неправильно введені дані',
  })
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
