import {
    Component,
    OnInit,
    Renderer2,
    OnDestroy,
    HostBinding
} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import {AppService} from '@services/app.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'register-box';

    public registerForm: UntypedFormGroup;
    public isAuthLoading = false;
    public isGoogleLoading = false;
    public isFacebookLoading = false;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService
    ) {}

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'register-page'
        );
        this.registerForm = new UntypedFormGroup({
            email: new UntypedFormControl(null, Validators.required),
            password: new UntypedFormControl(null, [Validators.required]),
            retypePassword: new UntypedFormControl(null, [Validators.required])
        });
    }

    async registerByAuth(username?: string, password?: string) {
        const email = username || this.registerForm.value.email;
        const pass = password || this.registerForm.value.password;

        if (this.registerForm.valid || (username && password)) {
            this.isAuthLoading = true;
        try {
            // Asegúrate de que registerWithEmail acepte username
            await this.appService.registerWithEmail(email, pass);
            this.toastr.success('Usuario registrado con éxito');
        } catch (error) {
            this.toastr.error('Error al registrar el usuario.');
        } finally {
            this.isAuthLoading = false;
        }
    } else {
        this.toastr.error('El formulario no es válido!');
    }
}

    async registerByGoogle() {
        this.isGoogleLoading = true;
        await this.appService.signInByGoogle();
        this.isGoogleLoading = false;
    }

    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'register-page'
        );
    }
}
