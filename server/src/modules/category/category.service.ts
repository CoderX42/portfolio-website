import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../../schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(dto: CreateCategoryDto) {
    const slug = dto.slug || slugify(dto.name);
    const category = new this.categoryModel({ ...dto, slug });
    return category.save();
  }

  async findAll() {
    return this.categoryModel.find().sort({ sortOrder: 1, createdAt: 1 }).lean();
  }

  async findById(id: string) {
    const category = await this.categoryModel.findById(id).lean();
    if (!category) throw new NotFoundException(`Category with id "${id}" not found`);
    return category;
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.categoryModel.findByIdAndUpdate(id, dto, { new: true });
    if (!category) throw new NotFoundException(`Category with id "${id}" not found`);
    return category;
  }

  async remove(id: string) {
    const result = await this.categoryModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Category with id "${id}" not found`);
    return { deleted: true };
  }
}
