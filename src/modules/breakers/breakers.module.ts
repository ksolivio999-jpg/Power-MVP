import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breaker } from './entities/breaker.entity';
import { BreakersController } from './breakers.controller';
import { BreakersService } from './breakers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Breaker])],
  controllers: [BreakersController],
  providers: [BreakersService],
  exports: [BreakersService],
})
export class BreakersModule {}