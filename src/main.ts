import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Get config service
  const configService = app.get(ConfigService);
  
  // Global prefix
  app.setGlobalPrefix('api');
  
  // Enable CORS
  app.enableCors({
    origin: configService.get('FRONTEND_URL') || 'http://localhost:3001',
    credentials: true,
  });
  
  // Global validation pipe with detailed error messages
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  
  // Global exception filter
  app.useGlobalFilters(new GlobalExceptionFilter());
  
  const port = configService.get('PORT') || 3000;
  console.log("DB_HOST ==>", configService.get('DB_HOST'));
  
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}/api`);
  console.log(`📚 Available endpoints:`);
  console.log(`   GET  /api/projects`);
  console.log(`   POST /api/projects`);
  console.log(`   GET  /api/floors`);
  console.log(`   POST /api/floors`);
  console.log(`   GET  /api/panels`);
  console.log(`   POST /api/panels`);
  console.log(`   GET  /api/breakers`);
  console.log(`   POST /api/breakers`);
  console.log(`   GET  /api/circuits`);
  console.log(`   POST /api/circuits`);
}
bootstrap();
