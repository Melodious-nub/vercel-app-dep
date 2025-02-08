import { Routes } from "@angular/router";

export const dashboardRoutes: Routes = [
    { path: 'analytics', loadComponent: () => import('../pages/dashboards/dashboard-analytics/dashboard-analytics.component').then(m => m.DashboardAnalyticsComponent) },
    { path: 'company', loadComponent: () => import('./company/company.component').then(m => m.CompanyComponent) },
    {
        path: 'company/:id',
        loadComponent: () => import('./company/employee-detail/employee-detail.component').then(m => m.EmployeeDetailComponent)
    },
    { path: 'calender', loadComponent: () => import('../pages/apps/calendar/calendar.component').then(m => m.CalendarComponent) },
    { path: 'document', loadComponent: () => import('./documents/documents.component').then(m => m.DocumentsComponent) },
    { path: 'training', loadComponent: () => import('./training/training.component').then(m => m.TrainingComponent) },
    { path: 'my-profile', loadComponent: () => import('./my-profile/my-profile.component').then(m => m.MyProfileComponent) },
    { path: 'account-settings', loadComponent: () => import('./account-settings/account-settings.component').then(m => m.AccountSettingsComponent) }
];