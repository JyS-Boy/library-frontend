import { Routes } from '@angular/router';

export const BOOK_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./list/book-list.page')
        .then(m => m.BookListPage)
  },
  {
    path: 'new',
    loadComponent: () =>
    import('./form/book-form.page')
      .then(m => m.BookFormPage)
  },
  {
    path: ':id/edit',
    loadComponent: () =>
    import('./edit/book-edit.page')
      .then(m => m.BookEditPage)
  },
  {
    path: ':id',
    loadComponent: () =>
    import('./detail/book-detail.page')
      .then(m => m.BookDetailPage)
  }
];