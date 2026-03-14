import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PageDocument = Page & Document;

@Schema({ timestamps: true })
export class Page {
  @Prop({ required: true, unique: true, enum: ['home', 'about', 'contact'] })
  slug: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false, default: '' })
  content: string;

  @Prop({ required: false, default: '' })
  metaTitle: string;

  @Prop({ required: false, default: '' })
  metaDescription: string;

  @Prop({ required: false, default: '' })
  heroImage: string;

  @Prop({ required: false, default: '' })
  extraData: string;

  @Prop({ required: true, enum: ['draft', 'published'], default: 'draft' })
  status: string;

  @Prop({ required: false, default: 0 })
  sortOrder: number;

  versions: Types.ObjectId[];

  @Prop({ required: false })
  publishedAt: Date;

  @Prop({ required: false, default: '' })
  publishedBy: string;
}

export const PageSchema = SchemaFactory.createForClass(Page);
