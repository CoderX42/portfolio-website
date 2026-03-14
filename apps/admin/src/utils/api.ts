import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export interface ProjectListItem {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: string;
  tags: string[];
  categoryIds: string[];
  status: string;
  createdAt: string;
}

export interface ProjectDetail extends ProjectListItem {
  content: string;
  media?: { type: string; url: string; alt?: string; caption?: string }[];
  codeSnippets?: { language: string; code: string; filename?: string }[];
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
  sortOrder: number;
}

export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ accessToken: string }>('/auth/login', { email, password }),
  me: () => api.get('/auth/me'),
};

export const projectApi = {
  getList: (params?: Record<string, unknown>) =>
    api.get<{ items: ProjectListItem[]; total: number; totalPages?: number }>('/projects', { params }),
  getById: (id: string) => api.get<ProjectDetail>(`/projects/${id}`),
  create: (data: Record<string, unknown>) => api.post<ProjectDetail>('/projects', data),
  update: (id: string, data: Record<string, unknown>) => api.patch<ProjectDetail>(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
};

export const categoryApi = {
  getAll: () => api.get<Category[]>('/categories'),
  create: (data: Record<string, unknown>) => api.post<Category>('/categories', data),
  update: (id: string, data: Record<string, unknown>) => api.patch<Category>(`/categories/${id}`, data),
  delete: (id: string) => api.delete(`/categories/${id}`),
};
