import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BreakersService } from './breakers.service';
import { CreateBreakerDto } from './dto/create-breaker.dto';
import { UpdateBreakerDto } from './dto/update-breaker.dto';

@Controller('breakers')
export class BreakersController {
  constructor(private readonly breakersService: BreakersService) {}

  @Post()
  create(@Body() createBreakerDto: CreateBreakerDto) {
    return this.breakersService.create(createBreakerDto);
  }

  @Get()
  findAll() {
    return this.breakersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.breakersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBreakerDto: UpdateBreakerDto) {
    return this.breakersService.update(id, updateBreakerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.breakersService.remove(id);
  }
}