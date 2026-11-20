import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./list/user-list.page')
        .then(
          m => m.UserListPage
        )
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./form/user-form.page')
        .then(m => m.UserFormPage)
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./edit/user-edit.page')
        .then(m => m.UserEditPage)
  },

  {
    path: ':id',
    loadComponent: () =>
      import('./detail/user-detail.page')
        .then(m => m.UserDetailPage)
  }
];