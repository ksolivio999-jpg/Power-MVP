import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PanelsService } from './panels.service';
import { CreatePanelDto } from './dto/create-panel.dto';
import { UpdatePanelDto } from './dto/update-panel.dto';

@Controller('panels')
export class PanelsController {
  constructor(private readonly panelsService: PanelsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPanelDto: CreatePanelDto) {
    const panel = await this.panelsService.create(createPanelDto);
    return {
      success: true,
      message: 'Panel created successfully',
      data: panel,
    };
  }

  @Get()
  async findAll(
    @Query('projectId') projectId?: string,
    @Query('floorId') floorId?: string
  ) {
    let panels;
    if (projectId) {
      panels = await this.panelsService.findByProject(projectId);
    } else if (floorId) {
      panels = await this.panelsService.findByFloor(floorId);
    } else {
      panels = await this.panelsService.findAll();
    }
    
    return {
      success: true,
      message: 'Panels retrieved successfully',
      data: panels,
    };
  }

  @Get('qr/:slug')
  async findByQrSlug(@Param('slug') slug: string) {
    const panel = await this.panelsService.findByQrSlug(slug);
    return {
      success: true,
      message: 'Panel retrieved successfully',
      data: panel,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const panel = await this.panelsService.findOne(id);
    return {
      success: true,
      message: 'Panel retrieved successfully',
      data: panel,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updatePanelDto: UpdatePanelDto
  ) {
    const panel = await this.panelsService.update(id, updatePanelDto);
    return {
      success: true,
      message: 'Panel updated successfully',
      data: panel,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.panelsService.remove(id);
    return {
      success: true,
      message: 'Panel deleted successfully',
    };
  }
}