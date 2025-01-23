import { LayoutComponent } from './layouts/layout/layout.component';
import { VexRoutes } from '@vex/interfaces/vex-route.interface';
import { LoginComponent } from './pages/pages/auth/login/login.component';
import { RegisterComponent } from './pages/pages/auth/register/register.component';
import { authGuard } from './services/auth/auth.guard';
import { ForgotPasswordComponent } from './pages/pages/auth/forgot-password/forgot-password.component';
import { Error404Component } from './pages/pages/errors/error-404/error-404.component';
import { ComingSoonComponent } from './pages/pages/coming-soon/coming-soon.component';
import { dashboardRoutes } from './modules/dashboard.routes';

export const appRoutes: VexRoutes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'welcome-page', component: ComingSoonComponent },
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: dashboardRoutes
  },
  { path: '**', component: Error404Component }
];
