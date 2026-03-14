import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ _id: false })
export class MediaItem {
  @Prop({ required: true })
  type: 'image' | 'video';

  @Prop({ required: true })
  url: string;

  @Prop()
  alt?: string;

  @Prop()
  caption?: string;
}

@Schema({ _id: false })
export class CodeSnippet {
  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  code: string;

  @Prop()
  filename?: string;
}

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: '' })
  content: string;

  @Prop()
  coverImage?: string;

  @Prop({ type: [Object], default: [] })
  media?: MediaItem[];

  @Prop({ type: [Object], default: [] })
  codeSnippets?: CodeSnippet[];

  @Prop({ type: [String], default: [] })
  categoryIds: string[];

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: 'draft' })
  status: 'draft' | 'published' | 'archived';

  @Prop({ default: 0 })
  sortOrder: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
ProjectSchema.index({ slug: 1 });
ProjectSchema.index({ status: 1, sortOrder: -1 });
ProjectSchema.index({ categoryIds: 1 });
ProjectSchema.index({ tags: 1 });
