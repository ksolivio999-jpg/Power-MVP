import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Floor } from './entities/floor.entity';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';

@Injectable()
export class FloorsService {
  constructor(
    @InjectRepository(Floor)
    private readonly floorRepository: Repository<Floor>,
  ) {}

  async create(createFloorDto: CreateFloorDto): Promise<Floor> {
    const floor = this.floorRepository.create(createFloorDto);
    return await this.floorRepository.save(floor);
  }

  async findAll(): Promise<Floor[]> {
    return await this.floorRepository.find({
      relations: ['project', 'panels'],
    });
  }

  async findOne(id: string): Promise<Floor> {
    const floor = await this.floorRepository.findOne({
      where: { id },
      relations: ['project', 'panels'],
    });
    if (!floor) {
      throw new NotFoundException(`Floor with ID ${id} not found`);
    }
    return floor;
  }

  async update(id: string, updateFloorDto: UpdateFloorDto): Promise<Floor> {
    const floor = await this.findOne(id);
    Object.assign(floor, updateFloorDto);
    return await this.floorRepository.save(floor);
  }

  async remove(id: string): Promise<void> {
    const floor = await this.findOne(id);
    await this.floorRepository.remove(floor);
  }
}