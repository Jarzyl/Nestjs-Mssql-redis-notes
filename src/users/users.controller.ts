import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED) // Status HTTP 201 po pomyślnej rejestracji
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(
        createUserDto.email,
        createUserDto.password,
        createUserDto.firstName,
        createUserDto.lastName,
      );
      return { message: 'User created successfully', user }; // Zwracanie odpowiedzi po sukcesie
    } catch (error) {
      return { message: error.message }; // Obsługa błędów
    }
  }
}
