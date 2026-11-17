export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface ListCategoryItem {
  id: string;
  name: string;
  description: string;
}

export interface CreateCategoryRequest {
  name: string;
}

export interface UpdateCategoryRequest {
  name: string;
  description: string;
}