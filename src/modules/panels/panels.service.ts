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
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Panel> {
    const panel = await this.panelRepository.findOne({
      where: { id },
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
    const result = await this.panelRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Panel with ID ${id} not found`);
    }
  }

  async findByProject(projectId: string): Promise<Panel[]> {
    return await this.panelRepository.find({
      where: { projectId },
      order: { createdAt: 'DESC' },
    });
  }

  async findByFloor(floorId: string): Promise<Panel[]> {
    return await this.panelRepository.find({
      where: { floorId },
      order: { createdAt: 'DESC' },
    });
  }

  async findByQrSlug(qrSlug: string): Promise<Panel> {
    const panel = await this.panelRepository.findOne({
      where: { qrSlug },
    });
    
    if (!panel) {
      throw new NotFoundException(`Panel with QR slug ${qrSlug} not found`);
    }
    
    return panel;
  }
}