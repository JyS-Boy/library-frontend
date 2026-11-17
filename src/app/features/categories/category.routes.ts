import { Routes } from '@angular/router';

export const CATEGORY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./list/category-list.page')
        .then(m => m.CategoryListPage)
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./form/category-form.page')
        .then(m => m.CategoryFormPage)
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./edit/category-edit.page')
        .then(m => m.CategoryEditPage)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./detail/category-detail.page')
        .then(m => m.CategoryDetailPage)
  }
];