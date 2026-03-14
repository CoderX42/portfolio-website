import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { QueryProjectDto } from './dto/query-project.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create project (admin)' })
  create(@Body() dto: CreateProjectDto) {
    return this.projectService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List projects with pagination and filters' })
  findAll(@Query() query: QueryProjectDto) {
    return this.projectService.findAll(query);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get project by slug (public)' })
  findBySlug(@Param('slug') slug: string) {
    return this.projectService.findBySlug(slug);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by id' })
  findOne(@Param('id') id: string) {
    return this.projectService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update project (admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete project (admin)' })
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
