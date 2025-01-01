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
import { MyProfileComponent } from './modules/my-profile/my-profile.component';
import { AccountSettingsComponent } from './modules/account-settings/account-settings.component';
import { ComingSoonComponent } from './pages/pages/coming-soon/coming-soon.component';

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
    children: [
      { path: 'analytics', component: DashboardAnalyticsComponent },
      { path: 'company', component: CompanyComponent },
      { path: 'company/:id', component: EmployeeDetailComponent }, // Route with ID parameter
      { path: 'calender', component: CalendarComponent },
      { path: 'my-profile', component: MyProfileComponent },
      { path: 'account-settings', component: AccountSettingsComponent },
    ]
  },
  { path: '**', component: Error404Component }
];
