import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing.component').then((m) => m.LandingComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'refactor',
    loadComponent: () =>
      import('./features/refactor/refactor.component').then((m) => m.RefactorComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
