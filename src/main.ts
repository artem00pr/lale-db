import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Проверка наличия JWT секретов
  if (!process.env.JWT_SECRET) {
    throw new Error('❌ JWT_SECRET is not defined in .env file');
  }
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('❌ JWT_REFRESH_SECRET is not defined in .env file');
  }

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.enableCors();

  await app.listen(8000);
  console.log(`🚀 Application is running on: http://localhost:8000`);
}

bootstrap();