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
import { TimeTrackingComponent } from '@pages/time-tracking/time-tracking.component';
import { EmployeeListComponent } from '@pages/employee/employee-list/employee-list.component';
import { ReportAdminComponent } from '@pages/report-admin/report-admin.component';
import { AddEmployeeComponent } from '@pages/employee/add-employee/add-employee.component';
import { EmployeeFormComponent } from '@pages/employee/employee-form/employee-form.component';
import { ListaUsuariosComponent } from '@pages/list-usuario/lista-usuarios/lista-usuarios.component';

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
                path: 'employee-list',
                component: EmployeeListComponent
            },
            {
                path: 'reports',
                component: ReportAdminComponent
            },
            {
                path: '',
                component: TimeTrackingComponent
            },
            { path: 'add-employee',
                component: AddEmployeeComponent
            },
            { path: 'employees/edit/:id',
                component: EmployeeFormComponent
            },
            {
                path: 'list-users',
                component: ListaUsuariosComponent
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
