export interface Book {
  id: string;
  title: string;
  isbn: string;
  stock: number;
  publicationYear: number;
  authorId: string;
  author: string;
  categoryId: string;
  category: string;
}

export interface ListBookItem {
  id: string;
  title: string;
  isbn: string;
  stock: number;
  author: string;
}

export interface CreateBookRequest {
  title: string;
  isbn: string;
  stock: number;
  publicationYear: number;
  authorId: string;
  categoryId: string;
}

export interface UpdateBookRequest {
  title: string;
  isbn: string;
  stock: number;
  publicationYear: number;
  authorId: string;
  categoryId: string;
}