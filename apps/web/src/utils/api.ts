import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

export interface ProjectListResponse {
  items: ProjectListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProjectListItem {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: string;
  tags: string[];
  categoryIds: string[];
  createdAt: string;
}

export interface ProjectDetail extends ProjectListItem {
  content: string;
  media?: { type: 'image' | 'video'; url: string; alt?: string; caption?: string }[];
  codeSnippets?: { language: string; code: string; filename?: string }[];
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
  sortOrder: number;
}

export const projectApi = {
  getList: (params?: { page?: number; limit?: number; categoryId?: string; tag?: string }) =>
    api.get<ProjectListResponse>('/projects', { params }),
  getBySlug: (slug: string) => api.get<ProjectDetail>(`/projects/slug/${slug}`),
};

export const categoryApi = {
  getAll: () => api.get<Category[]>('/categories'),
};

export const contactApi = {
  submit: (data: { name: string; email: string; message: string }) =>
    api.post<{ success: boolean }>('/contact', data),
};
