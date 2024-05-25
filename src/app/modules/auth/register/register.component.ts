import { Component } from '@angular/core';
import { NzFormModule, NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { setShowLoginForm } from '../../../state/app.actions';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Register } from '../../../models/interface/auth/register';
import { defaultRegister } from '../../../models/default/auth/auth';
import { AuthService } from '../../../services/auth/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  validateForm: FormGroup<{
    // nameRegister: FormControl<string>;
    email: FormControl<string>;
    // userRegister: FormControl<string>;
    password: FormControl<string>;
    checkPassword: FormControl<string>;
  }>;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  submitForm(): void {
    if (this.validateForm.valid) {
      const formValues = this.validateForm.value;
      const registerData: Register = {
        ...defaultRegister,
        email: formValues.email ?? '',
        password: formValues.password ?? ''
      };

      this.service.register(registerData).subscribe({
        next: (response) => {
          this.showLoginForm();
          this.createNotification(
            "success",
            "Welcome to the Community!",
            "Congratulations on joining us! 🎉 Your registration is complete. Get ready to dive into a world of possibilities. Let's start exploring together!"
          )
        },
        error: (error) => {
          let messageError = '';
          let codeError = '';
          if(error && error?.error){
            messageError = error?.error?.errors?.message;
            codeError = error?.error?.errors?.code;
          }
          this.createNotification(
            "error",
            "Oops! Something Went Wrong",
            `Uh-oh! It seems like there was an issue during login. ${messageError}. ${codeError}`
          )        }
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  showLoginForm(): void {
    this.store.dispatch(setShowLoginForm({ show: true }));
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  createNotification(type: string,title:string,description:string): void {
    this.notification.create(
      type,
      title,
      description
    );
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private store: Store<AppState>,
    private service: AuthService,
    private notification: NzNotificationService
  ) {
    this.validateForm = this.fb.group({
      // nameRegister: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      // userRegister: ['', [Validators.required]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
    });
  }
}
