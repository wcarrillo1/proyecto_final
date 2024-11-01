import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

import {AppRoutingModule} from '@/app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {HeaderComponent} from '@modules/main/header/header.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from '@pages/profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from '@modules/register/register.component';
import {ToastrModule} from 'ngx-toastr';

import {CommonModule, registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {UserComponent} from '@modules/main/header/user/user.component';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/auth/reducer';
import {uiReducer} from './store/ui/reducer';
import {ProfabricComponentsModule} from '@profabric/angular-components';
import {NgxGoogleAnalyticsModule} from 'ngx-google-analytics';
import {environment} from 'environments/environment';
import {SettingsTabComponent} from './pages/profile/settings-tab/settings-tab.component';
import {InfoBoxComponent} from './components/info-box/info-box.component';
import {ContentHeaderComponent} from './components/content-header/content-header.component';
import {LoadingComponent} from './components/loading/loading.component';
import {OverlayLoadingComponent} from './components/overlay-loading/overlay-loading.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { TimeTrackingComponent } from '@pages/time-tracking/time-tracking.component';
import { AddEmployeeComponent } from './pages/employee/add-employee/add-employee.component';
import { EmployeeFormComponent } from './pages/employee/employee-form/employee-form.component';
import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component';
import { ReportAdminComponent } from '@pages/report-admin/report-admin.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { RouterModule } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthInterceptor } from '@modules/login/http/authinterceptor.service';

registerLocaleData(localeEn, 'en-EN');

@NgModule({
    declarations: [
        SafeUrlPipe,
        SafeUrlPipe,
        AppComponent,
        MainComponent,
        LoginComponent,
        HeaderComponent,
        MenuSidebarComponent,
        ProfileComponent,
        RegisterComponent,
        UserComponent,
        ForgotPasswordComponent,
        RecoverPasswordComponent,
        MenuItemComponent,
        SettingsTabComponent,
        InfoBoxComponent,
        ContentHeaderComponent,
        LoadingComponent,
        OverlayLoadingComponent,
        TimeTrackingComponent,
        AddEmployeeComponent,
        EmployeeFormComponent,
        EmployeeFormComponent,
        EmployeeListComponent,
        ReportAdminComponent],
    bootstrap: [AppComponent],
    imports: [
        FormsModule,
        ProfabricComponentsModule,
        NgxExtendedPdfViewerModule,
        BrowserModule,
        StoreModule.forRoot({auth: authReducer, ui: uiReducer}),
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
        NgxGoogleAnalyticsModule.forRoot(environment.GA_ID),
        FontAwesomeModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi()), provideAnimationsAsync()]
})
export class AppModule {}
