import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Włącz CORS z podstawowymi ustawieniami
  app.enableCors({
    origin: 'http://localhost:4200', // Domena frontendu
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Metody HTTP
    credentials: true, // Jeśli używasz ciasteczek
  });

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  // Ustawienie prefiksu globalnego dla API
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
