import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Podaj poprawny adres e-mail' })
  email: string;

  @IsString({ message: 'Hasło musi być tekstem' })
  @MinLength(6, { message: 'Hasło musi mieć co najmniej 6 znaków' })
  password: string;

  @IsString({ message: 'Imię musi być tekstem' })
  firstName: string;

  @IsString({ message: 'Nazwisko musi być tekstem' })
  lastName: string;
}
