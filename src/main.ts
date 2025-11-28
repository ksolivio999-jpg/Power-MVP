import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  
  // Swagger API documentation setup
  const config = new DocumentBuilder()
    .setTitle('PowerMap API')
    .setDescription('PowerMap Backend API - Electrical panel and circuit management system')
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints (login/logout)')
    .addTag('users', 'User management endpoints')
    .addTag('projects', 'Project management endpoints')
    .addTag('floors', 'Floor management endpoints')
    .addTag('panels', 'Electrical panel management endpoints')
    .addTag('breakers', 'Circuit breaker management endpoints')
    .addTag('circuits', 'Circuit management endpoints')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  
  const port = configService.get('PORT') || 3000;
  console.log("DB_HOST ==>", configService.get('DB_HOST'));
  
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}/api`);
  console.log(`📚 Swagger API Documentation: http://localhost:${port}/api-docs`);
  console.log(`📊 Available endpoints:`);
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
