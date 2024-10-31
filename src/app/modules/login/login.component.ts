import {Component, OnInit, OnDestroy, Renderer2, HostBinding} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AppService} from '@services/app.service';
import { AuthService } from '@services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'login-box';
    public loginForm: UntypedFormGroup;
    public isAuthLoading = false;
    public isGoogleLoading = false;
    public isFacebookLoading = false;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'login-page'
        );
        this.loginForm = new UntypedFormGroup({
            email: new UntypedFormControl(null, Validators.required),
            password: new UntypedFormControl(null, Validators.required)
        });
    }

    async loginByAuth() {
        if (this.loginForm.valid) {
            this.isAuthLoading = true;
            this.login();
            await this.appService.loginWithEmail(
                this.loginForm.value.email,
                this.loginForm.value.password
            );

            this.isAuthLoading = false;
        } else {
            this.toastr.error('Form is not valid!');
        }
    }

    login(): void {
        console.log('Datos enviados:', { email: this.loginForm.value.email, contrasena: this.loginForm.value.password });
        this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
          response => {
            console.log('Login response:', response);
            if (response.token) {
              this.authService.checkRole();
              console.log('Token:', response.token);
              localStorage.setItem('username', response.username);
            } else {
              alert('Login failed');
            }
          },
          error => {
            console.error('Error al intentar loguearse:', error);
          }
        );
      }

      loginWithGoogle(): void {
        const emailGoogle ='default@google.com';
        const contrasenaGoogle = '12345678';
        console.log('Datos enviados:', { emailGoogle, contrasenaGoogle});
        this.authService.login(emailGoogle, contrasenaGoogle).subscribe(
          response => {
            console.log('Login response:', response);
            if (response.token) {
              this.authService.checkRole();
              console.log('Token:', response.token);
              localStorage.setItem('username', response.username);
            } else {
              alert('Login failed');
            }
          },
          error => {
            console.error('Error al intentar loguearse:', error);
          }
        );
      }

    async loginByGoogle() {
        this.isGoogleLoading = true;
        this.loginWithGoogle();
        await this.appService.signInByGoogle();
        this.isGoogleLoading = false;
    }

    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }
}
