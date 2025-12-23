import { Route } from '@angular/router';
import { PublicLayout } from './layout/public-layout/public-layout';

export const appRoutes: Route[] = [
  {
    path: '',
    component: PublicLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/landing/components/landing/landing').then(
            (m) => m.Landing
          ),
      },
    ],
  },
  {
    path: 'all',
    loadComponent: () =>
      import('./features/landing/components/landing-all.component').then(
        (m) => m.LandingAll
      ),
  },
  //   {
  //     path: 'dashboard',
  //     component: () =>
  //       import('./dashboard/dashboard.component').then(
  //         (m) => m.DashboardComponent
  //       ),
  //   },
  //   {
  //     path: 'auth',
  //     component: () =>
  //       import('./auth/auth.component').then((m) => m.AuthComponent),
  //   },
  {
    path: '**',
    redirectTo: '',
  },
];
