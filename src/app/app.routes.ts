import { VexRoutes } from '@vex/interfaces/vex-route.interface';
import { authGuard } from './services/auth/auth.guard';

export const appRoutes: VexRoutes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/pages/auth/login/login.component').then((m) => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/pages/auth/register/register.component').then((m) => m.RegisterComponent) },
  { path: 'forgot-password', loadComponent: () => import('./pages/pages/auth/forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent) },
  { path: 'welcome-page', loadComponent: () => import('./pages/pages/coming-soon/coming-soon.component').then((m) => m.ComingSoonComponent) },
  {
    path: 'dashboard',
    loadComponent: () => import('./layouts/layout/layout.component').then((m) => m.LayoutComponent),
    canActivate: [authGuard],
    loadChildren: () => import('./modules/dashboard.routes').then((m) => m.dashboardRoutes),
    // children: dashboardRoutes
  },
  { path: '**', loadComponent: () => import('./pages/pages/errors/error-404/error-404.component').then((m) => m.Error404Component) }
];
