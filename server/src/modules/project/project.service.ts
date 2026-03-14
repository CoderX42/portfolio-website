import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from '../../schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { QueryProjectDto } from './dto/query-project.dto';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private projectModel: Model<ProjectDocument>,
  ) {}

  async create(dto: CreateProjectDto) {
    const slug = dto.slug || slugify(dto.title);
    const existing = await this.projectModel.findOne({ slug });
    if (existing) {
      throw new Error(`Slug "${slug}" already exists`);
    }
    const project = new this.projectModel({
      ...dto,
      slug,
      categoryIds: dto.categoryIds || [],
      tags: dto.tags || [],
      media: dto.media || [],
      codeSnippets: dto.codeSnippets || [],
    });
    return project.save();
  }

  async findAll(query: QueryProjectDto) {
    const filter: Record<string, unknown> = {};
    if (query.status && query.status !== 'all') filter.status = query.status;
    else if (!query.status) filter.status = 'published';
    if (query.categoryId) filter.categoryIds = query.categoryId;
    if (query.tag) filter.tags = query.tag;
    if (query.search) {
      filter.$or = [
        { title: new RegExp(query.search, 'i') },
        { description: new RegExp(query.search, 'i') },
      ];
    }

    const page = query.page || 1;
    const limit = query.limit || 12;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.projectModel
        .find(filter)
        .sort({ sortOrder: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      this.projectModel.countDocuments(filter),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findBySlug(slug: string) {
    const project = await this.projectModel.findOne({ slug, status: 'published' }).lean();
    if (!project) throw new NotFoundException(`Project with slug "${slug}" not found`);
    return project;
  }

  async findById(id: string) {
    const project = await this.projectModel.findById(id).lean();
    if (!project) throw new NotFoundException(`Project with id "${id}" not found`);
    return project;
  }

  async update(id: string, dto: UpdateProjectDto) {
    const project = await this.projectModel.findByIdAndUpdate(id, dto, { new: true });
    if (!project) throw new NotFoundException(`Project with id "${id}" not found`);
    return project;
  }

  async remove(id: string) {
    const result = await this.projectModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Project with id "${id}" not found`);
    return { deleted: true };
  }
}
