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
import { FloorsService } from './floors.service';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';

@Controller('floors')
export class FloorsController {
  constructor(private readonly floorsService: FloorsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createFloorDto: CreateFloorDto) {
    const floor = await this.floorsService.create(createFloorDto);
    return {
      success: true,
      message: 'Floor created successfully',
      data: floor,
    };
  }

  @Get()
  async findAll(@Query('projectId') projectId?: string) {
    const floors = projectId 
      ? await this.floorsService.findByProject(projectId)
      : await this.floorsService.findAll();
    
    return {
      success: true,
      message: 'Floors retrieved successfully',
      data: floors,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const floor = await this.floorsService.findOne(id);
    return {
      success: true,
      message: 'Floor retrieved successfully',
      data: floor,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateFloorDto: UpdateFloorDto
  ) {
    const floor = await this.floorsService.update(id, updateFloorDto);
    return {
      success: true,
      message: 'Floor updated successfully',
      data: floor,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.floorsService.remove(id);
    return {
      success: true,
      message: 'Floor deleted successfully',
    };
  }
}