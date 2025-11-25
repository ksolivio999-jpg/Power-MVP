import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Circuit } from './entities/circuit.entity';
import { CircuitsController } from './circuits.controller';
import { CircuitsService } from './circuits.service';

@Module({
  imports: [TypeOrmModule.forFeature([Circuit])],
  controllers: [CircuitsController],
  providers: [CircuitsService],
  exports: [CircuitsService],
})
export class CircuitsModule {}