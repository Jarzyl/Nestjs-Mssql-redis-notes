import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Włącz CORS z podstawowymi ustawieniami
  app.enableCors({
    origin: 'http://localhost:4200', // Domena frontendu
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Metody HTTP
    credentials: true, // Jeśli używasz ciasteczek
  });

  await app.listen(3000);
}
bootstrap();
