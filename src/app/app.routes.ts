import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';
import { authGuard } from './core/guards/auth.guard';

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