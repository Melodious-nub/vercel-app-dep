import { LayoutComponent } from './layouts/layout/layout.component';
import { VexRoutes } from '@vex/interfaces/vex-route.interface';
import { LoginComponent } from './pages/pages/auth/login/login.component';
import { RegisterComponent } from './pages/pages/auth/register/register.component';
import { authGuard } from './services/auth/auth.guard';
import { DashboardAnalyticsComponent } from './pages/dashboards/dashboard-analytics/dashboard-analytics.component';
import { ForgotPasswordComponent } from './pages/pages/auth/forgot-password/forgot-password.component';
import { Error404Component } from './pages/pages/errors/error-404/error-404.component';
import { CompanyComponent } from './modules/company/company.component';
import { CalendarComponent } from './pages/apps/calendar/calendar.component';
import { EmployeeDetailComponent } from './modules/company/employee-detail/employee-detail.component';
import { SocialComponent } from './pages/apps/social/social.component';
import { MyProfileComponent } from './modules/my-profile/my-profile.component';
import { AccountSettingsComponent } from './modules/account-settings/account-settings.component';

export const appRoutes: VexRoutes = [
  // {
  //   path: 'login',
  //   loadComponent: () =>
  //     import('./pages/pages/auth/login/login.component').then(
  //       (m) => m.LoginComponent
  //     )
  // },
  // {
  //   path: 'register',
  //   loadComponent: () =>
  //     import('./pages/pages/auth/register/register.component').then(
  //       (m) => m.RegisterComponent
  //     )
  // },
  // {
  //   path: 'employee',
  //   component: LayoutComponent,
  //   children: [
  //     {
  //       path: 'directory',
  //       loadComponent: () =>
  //         import('./pages/apps/aio-table/aio-table.component').then(
  //           (m) => m.AioTableComponent
  //         ),
  //       data: {
  //         toolbarShadowEnabled: false
  //       }
  //     },
  //     {
  //       path: 'employee',
  //       loadComponent: () =>
  //         import('./pages/apps/aio-table/aio-table.component').then(
  //           (m) => m.AioTableComponent
  //         ),
  //       data: {
  //         toolbarShadowEnabled: false
  //       }
  //     },
  //     {
  //       path: 'personal',
  //       loadComponent: () =>
  //         import('./pages/apps/aio-table/aio-table.component').then(
  //           (m) => m.AioTableComponent
  //         ),
  //       data: {
  //         toolbarShadowEnabled: false
  //       }
  //     },
  //     {
  //       path: 'notes',
  //       loadComponent: () =>
  //         import('./pages/apps/aio-table/aio-table.component').then(
  //           (m) => m.AioTableComponent
  //         ),
  //       data: {
  //         toolbarShadowEnabled: false
  //       }
  //     },
  //     {
  //       path: 'documents',
  //       loadComponent: () =>
  //         import('./pages/apps/aio-table/aio-table.component').then(
  //           (m) => m.AioTableComponent
  //         ),
  //       data: {
  //         toolbarShadowEnabled: false
  //       }
  //     },
  //     {
  //       path: 'assets',
  //       loadComponent: () =>
  //         import('./pages/apps/aio-table/aio-table.component').then(
  //           (m) => m.AioTableComponent
  //         ),
  //       data: {
  //         toolbarShadowEnabled: false
  //       }
  //     },
  //     {
  //       path: 'training',
  //       loadComponent: () =>
  //         import('./pages/apps/aio-table/aio-table.component').then(
  //           (m) => m.AioTableComponent
  //         ),
  //       data: {
  //         toolbarShadowEnabled: false
  //       }
  //     },
  //     {
  //       path: 'emergency-contacts',
  //       loadComponent: () =>
  //         import('./pages/apps/aio-table/aio-table.component').then(
  //           (m) => m.AioTableComponent
  //         ),
  //       data: {
  //         toolbarShadowEnabled: false
  //       }
  //     },
  //     {
  //       path: 'tasks',
  //       loadComponent: () =>
  //         import('./pages/apps/aio-table/aio-table.component').then(
  //           (m) => m.AioTableComponent
  //         ),
  //       data: {
  //         toolbarShadowEnabled: false
  //       }
  //     },
  //     {
  //       path: 'onboading',
  //       loadComponent: () =>
  //         import('./pages/apps/aio-table/aio-table.component').then(
  //           (m) => m.AioTableComponent
  //         ),
  //       data: {
  //         toolbarShadowEnabled: false
  //       }
  //     },
  //     {
  //       path: 'reports',
  //       loadComponent: () =>
  //         import('./pages/apps/aio-table/aio-table.component').then(
  //           (m) => m.AioTableComponent
  //         ),
  //       data: {
  //         toolbarShadowEnabled: false
  //       }
  //     },
  //     {
  //       path: 'time-off',
  //       loadComponent: () =>
  //         import('./pages/apps/aio-table/aio-table.component').then(
  //           (m) => m.AioTableComponent
  //         ),
  //       data: {
  //         toolbarShadowEnabled: false
  //       }
  //     },
  //     {
  //       path: 'compensation',
  //       loadComponent: () =>
  //         import('./pages/apps/aio-table/aio-table.component').then(
  //           (m) => m.AioTableComponent
  //         ),
  //       data: {
  //         toolbarShadowEnabled: false
  //       }
  //     },
  //   ]
  // }

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'analytics', component: DashboardAnalyticsComponent },
      { path: 'company', component: CompanyComponent },
      { path: 'company/:id', component: EmployeeDetailComponent }, // Route with ID parameter
      { path: 'calender', component: CalendarComponent },
      {path: 'my-profile', component: MyProfileComponent},
      {path: 'account-settings', component: AccountSettingsComponent},
    ]
  },
  { path: '**', component: Error404Component }
];
