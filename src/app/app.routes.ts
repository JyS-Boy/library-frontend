import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  // Rutas públicas
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.page')
        .then((m) => m.LoginPage),
  },

  {
    path: '403',
    loadComponent: () =>
      import('./features/errors/forbidden/forbidden.page')
        .then((m) => m.ForbiddenPage),
  },

  {
    path: '404',
    loadComponent: () =>
      import('./features/errors/not-found/not-found.page')
        .then((m) => m.NotFoundPage),
  },

  // Rutas protegidas
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.page')
            .then((m) => m.DashboardPage),
      },

      {
        path: 'authors',
        loadChildren: () =>
          import('./features/authors/author.routes')
            .then(m => m.AUTHOR_ROUTES)
      },

      {
        path: 'categories',
        loadChildren: () =>
          import('./features/categories/category.routes')
            .then(m => m.CATEGORY_ROUTES)
      },

      {
        path: 'readers',
        loadChildren: () =>
          import('./features/readers/reader.routes')
            .then(m => m.READER_ROUTES)
      },

      {
        path: 'books',
        loadChildren: () =>
          import('./features/books/book.routes')
            .then(m => m.BOOK_ROUTES)
      },
      {
        path: 'loans',
        loadChildren: () =>
          import('./features/loans/loan.routes')
            .then(m => m.LOAN_ROUTES)
      },
      {
        path: 'users',
        canActivate: [adminGuard],
        loadChildren: () =>
          import('./features/users/user.routes')
            .then(m => m.USER_ROUTES)
      }
    ],
  },

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  {
    path: '**',
    redirectTo: '404',
  },
];