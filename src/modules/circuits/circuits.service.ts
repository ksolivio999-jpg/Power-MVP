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
      relations: ['breaker'],
    });
  }

  async findOne(id: string): Promise<Circuit> {
    const circuit = await this.circuitRepository.findOne({
      where: { id },
      relations: ['breaker'],
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
    const circuit = await this.findOne(id);
    await this.circuitRepository.remove(circuit);
  }
}