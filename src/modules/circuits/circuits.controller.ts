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
import { CircuitsService } from './circuits.service';
import { CreateCircuitDto } from './dto/create-circuit.dto';
import { UpdateCircuitDto } from './dto/update-circuit.dto';

@Controller('circuits')
export class CircuitsController {
  constructor(private readonly circuitsService: CircuitsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCircuitDto: CreateCircuitDto) {
    const circuit = await this.circuitsService.create(createCircuitDto);
    return {
      success: true,
      message: 'Circuit created successfully',
      data: circuit,
    };
  }

  @Get()
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
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const circuit = await this.circuitsService.findOne(id);
    return {
      success: true,
      message: 'Circuit retrieved successfully',
      data: circuit,
    };
  }

  @Patch(':id')
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
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.circuitsService.remove(id);
    return {
      success: true,
      message: 'Circuit deleted successfully',
    };
  }
}