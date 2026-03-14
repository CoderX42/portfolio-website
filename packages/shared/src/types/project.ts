export type ProjectStatus = 'draft' | 'published' | 'archived';

export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  alt?: string;
  caption?: string;
}

export interface CodeSnippet {
  language: string;
  code: string;
  filename?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage?: string;
  media?: MediaItem[];
  codeSnippets?: CodeSnippet[];
  categoryIds: string[];
  tags: string[];
  status: ProjectStatus;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectCreateInput {
  title: string;
  slug?: string;
  description: string;
  content: string;
  coverImage?: string;
  media?: MediaItem[];
  codeSnippets?: CodeSnippet[];
  categoryIds?: string[];
  tags?: string[];
  status?: ProjectStatus;
  sortOrder?: number;
}

export interface ProjectUpdateInput extends Partial<ProjectCreateInput> {}

export interface ProjectListQuery {
  page?: number;
  limit?: number;
  categoryId?: string;
  tag?: string;
  status?: ProjectStatus;
  search?: string;
}
