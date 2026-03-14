export const API_PREFIX = '/api/v1';

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  PROJECTS: '/projects',
  PROJECT_BY_SLUG: (slug: string) => `/projects/slug/${slug}`,
  PROJECT_BY_ID: (id: string) => `/projects/${id}`,
  CATEGORIES: '/categories',
  CATEGORY_BY_ID: (id: string) => `/categories/${id}`,
  UPLOAD: '/upload',
  USERS: '/users',
} as const;

export const PROJECT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;
