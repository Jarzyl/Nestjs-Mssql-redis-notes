import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // Załadowanie zmiennych środowiskowych z pliku .env
    ConfigModule.forRoot({
      isGlobal: true, // Sprawia, że ConfigModule jest dostępny globalnie
      envFilePath: '.env',
    }),

    // Konfiguracja TypeORM z ConfigService
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User],
        options: {
          encrypt: false, // MSSQL-specific option
        },
        synchronize: false, // Zaleca się ustawienie na false w środowisku produkcyjnym
      }),
      inject: [ConfigService], // Inject ConfigService do fabryki
    }),

    NotesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
