import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page, PageDocument } from './page.schema';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PageService {
  constructor(
    @InjectModel(Page.name) private pageModel: Model<PageDocument>,
  ) {}

  async create(createPageDto: CreatePageDto): Promise<Page> {
    const createdPage = new this.pageModel(createPageDto);
    return createdPage.save();
  }

  async findAll(): Promise<Page[]> {
    return this.pageModel.find().sort({ sortOrder: 1, createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Page> {
    const page = await this.pageModel.findById(id).exec();
    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }
    return page;
  }

  async findBySlug(slug: string): Promise<Page | null> {
    return this.pageModel.findOne({ slug, status: 'published' }).exec();
  }

  async findBySlugIncludeDraft(slug: string): Promise<Page | null> {
    return this.pageModel.findOne({ slug }).exec();
  }

  async update(id: string, updatePageDto: UpdatePageDto): Promise<Page> {
    const page = await this.pageModel
      .findByIdAndUpdate(id, updatePageDto, { new: true })
      .exec();
    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }
    return page;
  }

  async publish(id: string, publishedBy: string): Promise<Page> {
    const page = await this.pageModel
      .findByIdAndUpdate(
        id,
        {
          status: 'published',
          publishedAt: new Date(),
          publishedBy,
        },
        { new: true },
      )
      .exec();
    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }
    return page;
  }

  async unpublish(id: string): Promise<Page> {
    const page = await this.pageModel
      .findByIdAndUpdate(
        id,
        {
          status: 'draft',
          publishedAt: null,
          publishedBy: '',
        },
        { new: true },
      )
      .exec();
    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }
    return page;
  }

  async remove(id: string): Promise<void> {
    const result = await this.pageModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }
  }

  async seedDefaultPages(): Promise<void> {
    const defaultPages = [
      {
        slug: 'home',
        title: '首页',
        content: '# 欢迎来到 Vibe Coding\n\n探索 AI 辅助编程的创意与实践',
        metaTitle: 'Vibe Coding - 作品集',
        metaDescription: '探索 AI 辅助编程的创意与实践，分享前沿技术项目',
        status: 'published',
        sortOrder: 1,
      },
      {
        slug: 'about',
        title: '关于我',
        content: '# 关于我\n\n我是一名专注于 AI 辅助编程的开发者...',
        metaTitle: '关于我 - Vibe Coding',
        metaDescription: '了解我的背景和技能',
        status: 'published',
        sortOrder: 2,
      },
      {
        slug: 'contact',
        title: '联系我',
        content: '# 联系我\n\n有任何项目想法或合作意向，欢迎随时联系！',
        metaTitle: '联系我 - Vibe Coding',
        metaDescription: '获取联系方式，开始合作',
        status: 'published',
        sortOrder: 3,
      },
    ];

    for (const pageData of defaultPages) {
      const existing = await this.pageModel.findOne({ slug: pageData.slug });
      if (!existing) {
        await this.pageModel.create(pageData);
      }
    }
  }
}
