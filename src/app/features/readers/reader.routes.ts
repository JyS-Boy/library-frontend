import { Routes } from '@angular/router';

export const READER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./list/reader-list.page')
        .then(m => m.ReaderListPage)
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./form/reader-form.page')
        .then(m => m.ReaderFormPage)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./detail/reader-detail.page')
        .then(m => m.ReaderDetailPage)
  },
  {
    path: ':id/edit',
    loadComponent: () =>
    import('./edit/reader-edit.page')
      .then(m => m.ReaderEditPage)
  }
];