import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getDatabaseConfig } from './config/database.config';

// Import all feature modules
import { UsersModule } from './modules/users/users.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { FloorsModule } from './modules/floors/floors.module';
import { PanelsModule } from './modules/panels/panels.module';
import { BreakersModule } from './modules/breakers/breakers.module';
import { CircuitsModule } from './modules/circuits/circuits.module';

@Module({
  imports: [
    // Environment configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // Database configuration
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),

    // Feature modules
    UsersModule,
    ProjectsModule,
    FloorsModule,
    PanelsModule,
    BreakersModule,
    CircuitsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}