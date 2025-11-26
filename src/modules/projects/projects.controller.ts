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
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProjectDto: CreateProjectDto) {
    const project = await this.projectsService.create(createProjectDto);
    return {
      success: true,
      message: 'Project created successfully',
      data: project,
    };
  }

  @Get()
  async findAll(@Query('userId') userId?: string) {
    const projects = userId 
      ? await this.projectsService.findByUser(userId)
      : await this.projectsService.findAll();
    
    return {
      success: true,
      message: 'Projects retrieved successfully',
      data: projects,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const project = await this.projectsService.findOne(id);
    return {
      success: true,
      message: 'Project retrieved successfully',
      data: project,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateProjectDto: UpdateProjectDto
  ) {
    const project = await this.projectsService.update(id, updateProjectDto);
    return {
      success: true,
      message: 'Project updated successfully',
      data: project,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.projectsService.remove(id);
    return {
      success: true,
      message: 'Project deleted successfully',
    };
  }
}