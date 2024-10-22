import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import { TimeTrackingComponent } from '@pages/time-tracking/time-tracking.component';
import { EmployeeListComponent } from '@pages/employee/employee-list/employee-list.component';
import { ReportAdminComponent } from '@pages/report-admin/report-admin.component';
import { DepartmentReportComponent } from './reports/department-report/department-report.component';
import { GeneralReportComponent } from './reports/general-report/general-report.component';
import { IndividualReportComponent } from './reports/individual-report/individual-report.component';
import { OvertimeReportComponent } from './reports/overtime-report/overtime-report.component';
import { EarlyCheckoutReportComponent } from './reports/early-checkout-report/early-checkout-report.component';
import { AddEmployeeComponent } from '@pages/employee/add-employee/add-employee.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'blank',
                component: EmployeeListComponent
            },
            {
                path: 'reports',
                component: ReportAdminComponent
            },
            {
                path: 'sub-menu-2',
                component: EmployeeListComponent
            },
            {
                path: '',
                component: TimeTrackingComponent
            },
            { path: 'reports/department', 
                component: DepartmentReportComponent 
            },
            { path: 'reports/general', 
                component: GeneralReportComponent 
            },
            { path: 'reports/individual', 
                component: IndividualReportComponent 
            },
            { path: 'reports/overtime', 
                component: OvertimeReportComponent 
            },
            { path: 'reports/early-checkout', 
                component: EarlyCheckoutReportComponent 
            },
            { path: 'add-employee',
                component: AddEmployeeComponent
            },
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
