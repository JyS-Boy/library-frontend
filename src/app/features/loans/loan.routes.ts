import { Routes } from '@angular/router';

export const LOAN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./list/loan-list.page')
        .then(m => m.LoanListPage)
  },

    {
    path: 'new',
    loadComponent: () =>
    import('./form/loan-form.page')
    .then(m => m.LoanFormPage)
  },
  {
     path: ':id',
     loadComponent: () =>
     import('./detail/loan-detail.page')
     .then(m => m.LoanDetailPage)
  }
];