import { Routes } from "@angular/router";
import { DashboardAnalyticsComponent } from "../pages/dashboards/dashboard-analytics/dashboard-analytics.component";
import { CompanyComponent } from "./company/company.component";
import { MyProfileComponent } from "./my-profile/my-profile.component";
import { CalendarComponent } from "../pages/apps/calendar/calendar.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";

export const dashboardRoutes: Routes = [
    { path: 'analytics', component: DashboardAnalyticsComponent },
    { path: 'company', component: CompanyComponent },
    {
        path: 'company/:id',
        loadComponent: () => import('./company/employee-detail/employee-detail.component').then((m) => m.EmployeeDetailComponent),
        // component: EmployeeDetailComponent
    }, // Route with ID parameter
    { path: 'calender', component: CalendarComponent },
    { path: 'my-profile', component: MyProfileComponent },
    { path: 'account-settings', component: AccountSettingsComponent },
]