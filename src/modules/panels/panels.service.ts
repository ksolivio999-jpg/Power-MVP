import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Panel } from './entities/panel.entity';
import { CreatePanelDto } from './dto/create-panel.dto';
import { UpdatePanelDto } from './dto/update-panel.dto';

@Injectable()
export class PanelsService {
  constructor(
    @InjectRepository(Panel)
    private readonly panelRepository: Repository<Panel>,
  ) {}

  async create(createPanelDto: CreatePanelDto): Promise<Panel> {
    const panel = this.panelRepository.create(createPanelDto);
    return await this.panelRepository.save(panel);
  }

  async findAll(): Promise<Panel[]> {
    return await this.panelRepository.find({
      relations: ['project', 'floor', 'breakers', 'subpanels'],
    });
  }

  async findOne(id: string): Promise<Panel> {
    const panel = await this.panelRepository.findOne({
      where: { id },
      relations: ['project', 'floor', 'breakers', 'subpanels', 'parentPanel'],
    });
    if (!panel) {
      throw new NotFoundException(`Panel with ID ${id} not found`);
    }
    return panel;
  }

  async update(id: string, updatePanelDto: UpdatePanelDto): Promise<Panel> {
    const panel = await this.findOne(id);
    Object.assign(panel, updatePanelDto);
    return await this.panelRepository.save(panel);
  }

  async remove(id: string): Promise<void> {
    const panel = await this.findOne(id);
    await this.panelRepository.remove(panel);
  }
}