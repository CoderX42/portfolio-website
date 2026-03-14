export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryCreateInput {
  name: string;
  slug?: string;
  icon?: string;
  sortOrder?: number;
}

export interface CategoryUpdateInput {
  name?: string;
  slug?: string;
  icon?: string;
  sortOrder?: number;
}
