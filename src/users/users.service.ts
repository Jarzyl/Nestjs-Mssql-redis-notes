import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>, // Repozytorium TypeORM
  ) {}

  // Tworzenie użytkownika w bazie danych
  async create(email: string, password: string, firstName: string, lastName: string): Promise<User> {
    const existingUser = await this.findByEmail(email); // Sprawdzenie, czy użytkownik o takim emailu już istnieje
    if (existingUser) {
      throw new Error('User with this email already exists'); // Jeśli istnieje, rzucamy błąd
    }
    
    const hashedPassword = await bcrypt.hash(password, 10); // Haszowanie hasła
    const user = this.usersRepository.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      }); // Tworzenie nowego użytkownika
    return await this.usersRepository.save(user); // Zapisanie użytkownika w bazie
  }
  

  // Wyszukiwanie użytkownika po emailu
  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } }); // Wyszukiwanie użytkownika w bazie
  }

  // Weryfikacja użytkownika
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email); // Znalezienie użytkownika po emailu
    if (user && (await bcrypt.compare(password, user.password))) { // Porównanie hasła
      return user; // Zwrócenie użytkownika, jeśli hasło jest poprawne
    }
    return null; // Zwrócenie null, jeśli dane są błędne
  }
}
