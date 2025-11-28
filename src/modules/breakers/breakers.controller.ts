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
import { BreakersService } from './breakers.service';
import { CreateBreakerDto } from './dto/create-breaker.dto';
import { UpdateBreakerDto } from './dto/update-breaker.dto';

@ApiTags('breakers')
@Controller('breakers')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BreakersController {
  constructor(private readonly breakersService: BreakersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new circuit breaker' })
  @ApiResponse({ status: 201, description: 'Breaker created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
  async create(@Body() createBreakerDto: CreateBreakerDto) {
    const breaker = await this.breakersService.create(createBreakerDto);
    return {
      success: true,
      message: 'Breaker created successfully',
      data: breaker,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all breakers or filter by panel' })
  @ApiQuery({ name: 'panelId', required: false, description: 'Filter by panel ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'Breakers retrieved successfully' })
  async findAll(@Query('panelId') panelId?: string) {
    const breakers = panelId 
      ? await this.breakersService.findByPanel(panelId)
      : await this.breakersService.findAll();
    
    return {
      success: true,
      message: 'Breakers retrieved successfully',
      data: breakers,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a breaker by ID' })
  @ApiParam({ name: 'id', description: 'Breaker ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'Breaker retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Breaker not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const breaker = await this.breakersService.findOne(id);
    return {
      success: true,
      message: 'Breaker retrieved successfully',
      data: breaker,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a breaker' })
  @ApiParam({ name: 'id', description: 'Breaker ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'Breaker updated successfully' })
  @ApiResponse({ status: 404, description: 'Breaker not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateBreakerDto: UpdateBreakerDto
  ) {
    const breaker = await this.breakersService.update(id, updateBreakerDto);
    return {
      success: true,
      message: 'Breaker updated successfully',
      data: breaker,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a breaker' })
  @ApiParam({ name: 'id', description: 'Breaker ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 204, description: 'Breaker deleted successfully' })
  @ApiResponse({ status: 404, description: 'Breaker not found' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.breakersService.remove(id);
    return {
      success: true,
      message: 'Breaker deleted successfully',
    };
  }
}