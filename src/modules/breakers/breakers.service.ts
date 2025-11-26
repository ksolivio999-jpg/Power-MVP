import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breaker } from './entities/breaker.entity';
import { CreateBreakerDto } from './dto/create-breaker.dto';
import { UpdateBreakerDto } from './dto/update-breaker.dto';

@Injectable()
export class BreakersService {
  constructor(
    @InjectRepository(Breaker)
    private readonly breakerRepository: Repository<Breaker>,
  ) {}

  async create(createBreakerDto: CreateBreakerDto): Promise<Breaker> {
    const breaker = this.breakerRepository.create(createBreakerDto);
    return await this.breakerRepository.save(breaker);
  }

  async findAll(): Promise<Breaker[]> {
    return await this.breakerRepository.find({
      order: { position: 'ASC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Breaker> {
    const breaker = await this.breakerRepository.findOne({
      where: { id },
    });
    
    if (!breaker) {
      throw new NotFoundException(`Breaker with ID ${id} not found`);
    }
    
    return breaker;
  }

  async update(id: string, updateBreakerDto: UpdateBreakerDto): Promise<Breaker> {
    const breaker = await this.findOne(id);
    
    Object.assign(breaker, updateBreakerDto);
    return await this.breakerRepository.save(breaker);
  }

  async remove(id: string): Promise<void> {
    const result = await this.breakerRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Breaker with ID ${id} not found`);
    }
  }

  async findByPanel(panelId: string): Promise<Breaker[]> {
    return await this.breakerRepository.find({
      where: { panelId },
      order: { position: 'ASC', createdAt: 'DESC' },
    });
  }
}