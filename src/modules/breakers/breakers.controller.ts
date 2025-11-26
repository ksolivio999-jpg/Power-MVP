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
import { BreakersService } from './breakers.service';
import { CreateBreakerDto } from './dto/create-breaker.dto';
import { UpdateBreakerDto } from './dto/update-breaker.dto';

@Controller('breakers')
export class BreakersController {
  constructor(private readonly breakersService: BreakersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBreakerDto: CreateBreakerDto) {
    const breaker = await this.breakersService.create(createBreakerDto);
    return {
      success: true,
      message: 'Breaker created successfully',
      data: breaker,
    };
  }

  @Get()
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
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const breaker = await this.breakersService.findOne(id);
    return {
      success: true,
      message: 'Breaker retrieved successfully',
      data: breaker,
    };
  }

  @Patch(':id')
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
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.breakersService.remove(id);
    return {
      success: true,
      message: 'Breaker deleted successfully',
    };
  }
}