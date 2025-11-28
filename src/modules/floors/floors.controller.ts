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
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FloorsService } from './floors.service';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';

@ApiTags('floors')
@Controller('floors')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FloorsController {
  constructor(private readonly floorsService: FloorsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new floor' })
  @ApiResponse({ status: 201, description: 'Floor created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
  async create(@Body() createFloorDto: CreateFloorDto) {
    const floor = await this.floorsService.create(createFloorDto);
    return {
      success: true,
      message: 'Floor created successfully',
      data: floor,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all floors or floors by project' })
  @ApiQuery({ name: 'projectId', required: false, description: 'Filter by project ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'Floors retrieved successfully' })
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
  @ApiOperation({ summary: 'Get a floor by ID' })
  @ApiParam({ name: 'id', description: 'Floor ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'Floor retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Floor not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const floor = await this.floorsService.findOne(id);
    return {
      success: true,
      message: 'Floor retrieved successfully',
      data: floor,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a floor' })
  @ApiParam({ name: 'id', description: 'Floor ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'Floor updated successfully' })
  @ApiResponse({ status: 404, description: 'Floor not found' })
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
  @ApiOperation({ summary: 'Delete a floor' })
  @ApiParam({ name: 'id', description: 'Floor ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 204, description: 'Floor deleted successfully' })
  @ApiResponse({ status: 404, description: 'Floor not found' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.floorsService.remove(id);
    return {
      success: true,
      message: 'Floor deleted successfully',
    };
  }
}