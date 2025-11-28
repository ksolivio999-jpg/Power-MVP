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
import { PanelsService } from './panels.service';
import { CreatePanelDto } from './dto/create-panel.dto';
import { UpdatePanelDto } from './dto/update-panel.dto';

@ApiTags('panels')
@Controller('panels')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PanelsController {
  constructor(private readonly panelsService: PanelsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new electrical panel' })
  @ApiResponse({ status: 201, description: 'Panel created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
  async create(@Body() createPanelDto: CreatePanelDto) {
    const panel = await this.panelsService.create(createPanelDto);
    return {
      success: true,
      message: 'Panel created successfully',
      data: panel,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all panels or filter by project/floor' })
  @ApiQuery({ name: 'projectId', required: false, description: 'Filter by project ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiQuery({ name: 'floorId', required: false, description: 'Filter by floor ID', example: '223e4567-e89b-12d3-a456-426614174001' })
  @ApiResponse({ status: 200, description: 'Panels retrieved successfully' })
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
  @ApiOperation({ summary: 'Get panel by QR code slug' })
  @ApiParam({ name: 'slug', description: 'QR code slug', example: 'main-panel-a' })
  @ApiResponse({ status: 200, description: 'Panel retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Panel not found' })
  async findByQrSlug(@Param('slug') slug: string) {
    const panel = await this.panelsService.findByQrSlug(slug);
    return {
      success: true,
      message: 'Panel retrieved successfully',
      data: panel,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a panel by ID' })
  @ApiParam({ name: 'id', description: 'Panel ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'Panel retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Panel not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const panel = await this.panelsService.findOne(id);
    return {
      success: true,
      message: 'Panel retrieved successfully',
      data: panel,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a panel' })
  @ApiParam({ name: 'id', description: 'Panel ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'Panel updated successfully' })
  @ApiResponse({ status: 404, description: 'Panel not found' })
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
  @ApiOperation({ summary: 'Delete a panel' })
  @ApiParam({ name: 'id', description: 'Panel ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 204, description: 'Panel deleted successfully' })
  @ApiResponse({ status: 404, description: 'Panel not found' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.panelsService.remove(id);
    return {
      success: true,
      message: 'Panel deleted successfully',
    };
  }
}