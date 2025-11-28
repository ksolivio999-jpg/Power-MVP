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
import { CircuitsService } from './circuits.service';
import { CreateCircuitDto } from './dto/create-circuit.dto';
import { UpdateCircuitDto } from './dto/update-circuit.dto';

@ApiTags('circuits')
@Controller('circuits')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CircuitsController {
  constructor(private readonly circuitsService: CircuitsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new electrical circuit' })
  @ApiResponse({ status: 201, description: 'Circuit created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
  async create(@Body() createCircuitDto: CreateCircuitDto) {
    const circuit = await this.circuitsService.create(createCircuitDto);
    return {
      success: true,
      message: 'Circuit created successfully',
      data: circuit,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all circuits or filter by breaker/dedicated status' })
  @ApiQuery({ name: 'breakerId', required: false, description: 'Filter by breaker ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiQuery({ name: 'dedicated', required: false, description: 'Filter dedicated circuits', example: 'true' })
  @ApiResponse({ status: 200, description: 'Circuits retrieved successfully' })
  async findAll(
    @Query('breakerId') breakerId?: string,
    @Query('dedicated') dedicated?: string
  ) {
    let circuits;
    if (breakerId) {
      circuits = await this.circuitsService.findByBreaker(breakerId);
    } else if (dedicated === 'true') {
      circuits = await this.circuitsService.findDedicated();
    } else {
      circuits = await this.circuitsService.findAll();
    }
    
    return {
      success: true,
      message: 'Circuits retrieved successfully',
      data: circuits,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a circuit by ID' })
  @ApiParam({ name: 'id', description: 'Circuit ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'Circuit retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Circuit not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const circuit = await this.circuitsService.findOne(id);
    return {
      success: true,
      message: 'Circuit retrieved successfully',
      data: circuit,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a circuit' })
  @ApiParam({ name: 'id', description: 'Circuit ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'Circuit updated successfully' })
  @ApiResponse({ status: 404, description: 'Circuit not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateCircuitDto: UpdateCircuitDto
  ) {
    const circuit = await this.circuitsService.update(id, updateCircuitDto);
    return {
      success: true,
      message: 'Circuit updated successfully',
      data: circuit,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a circuit' })
  @ApiParam({ name: 'id', description: 'Circuit ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 204, description: 'Circuit deleted successfully' })
  @ApiResponse({ status: 404, description: 'Circuit not found' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.circuitsService.remove(id);
    return {
      success: true,
      message: 'Circuit deleted successfully',
    };
  }
}