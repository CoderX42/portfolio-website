import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('pages')
@Controller('pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create page (admin)' })
  create(@Body() dto: CreatePageDto) {
    return this.pageService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all pages (admin)' })
  findAll() {
    return this.pageService.findAll();
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get published page by slug (public)' })
  findBySlug(@Param('slug') slug: string) {
    return this.pageService.findBySlug(slug);
  }

  @Get('slug/:slug/edit')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get page by slug for editing (admin)' })
  findBySlugForEdit(@Param('slug') slug: string) {
    return this.pageService.findBySlugIncludeDraft(slug);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get page by id (admin)' })
  findOne(@Param('id') id: string) {
    return this.pageService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update page (admin)' })
  update(@Param('id') id: string, @Body() dto: UpdatePageDto) {
    return this.pageService.update(id, dto);
  }

  @Patch(':id/publish')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Publish page (admin)' })
  publish(@Param('id') id: string, @Request() req: any) {
    const publishedBy = req.user?.email || 'admin';
    return this.pageService.publish(id, publishedBy);
  }

  @Patch(':id/unpublish')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unpublish page (admin)' })
  unpublish(@Param('id') id: string) {
    return this.pageService.unpublish(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete page (admin)' })
  remove(@Param('id') id: string) {
    return this.pageService.remove(id);
  }

  @Post('seed')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Seed default pages (admin)' })
  seed() {
    return this.pageService.seedDefaultPages();
  }
}
