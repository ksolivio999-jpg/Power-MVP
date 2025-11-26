import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Circuit } from './entities/circuit.entity';
import { CreateCircuitDto } from './dto/create-circuit.dto';
import { UpdateCircuitDto } from './dto/update-circuit.dto';

@Injectable()
export class CircuitsService {
  constructor(
    @InjectRepository(Circuit)
    private readonly circuitRepository: Repository<Circuit>,
  ) {}

  async create(createCircuitDto: CreateCircuitDto): Promise<Circuit> {
    const circuit = this.circuitRepository.create(createCircuitDto);
    return await this.circuitRepository.save(circuit);
  }

  async findAll(): Promise<Circuit[]> {
    return await this.circuitRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Circuit> {
    const circuit = await this.circuitRepository.findOne({
      where: { id },
    });
    
    if (!circuit) {
      throw new NotFoundException(`Circuit with ID ${id} not found`);
    }
    
    return circuit;
  }

  async update(id: string, updateCircuitDto: UpdateCircuitDto): Promise<Circuit> {
    const circuit = await this.findOne(id);
    
    Object.assign(circuit, updateCircuitDto);
    return await this.circuitRepository.save(circuit);
  }

  async remove(id: string): Promise<void> {
    const result = await this.circuitRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Circuit with ID ${id} not found`);
    }
  }

  async findByBreaker(breakerId: string): Promise<Circuit[]> {
    return await this.circuitRepository.find({
      where: { breakerId },
      order: { createdAt: 'DESC' },
    });
  }

  async findDedicated(): Promise<Circuit[]> {
    return await this.circuitRepository.find({
      where: { isDedicated: true },
      order: { createdAt: 'DESC' },
    });
  }
}