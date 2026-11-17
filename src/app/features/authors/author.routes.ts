import { Routes } from '@angular/router';

export const AUTHOR_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./list/author-list.page')
        .then(m => m.AuthorListPage)
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./form/author-form.page')
        .then(m => m.AuthorFormPage)
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./edit/author-edit.page')
        .then(m => m.AuthorEditPage)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./detail/author-detail.page')
        .then(m => m.AuthorDetailPage)
  }
];