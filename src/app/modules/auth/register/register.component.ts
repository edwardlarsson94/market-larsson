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
    nameRegister: FormControl<string>;
    email: FormControl<string>;
    userRegister: FormControl<string>;
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
        fullName: formValues.nameRegister ?? '',
        email: formValues.email ?? '',
        user: formValues.userRegister ?? '',
        password: formValues.password ?? ''
      };

      this.service.register(registerData).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.showLoginForm();
        },
        error: (error) => {
          console.error('Registration failed', error);
        }
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

  constructor(
    private fb: NonNullableFormBuilder,
    private store: Store<AppState>,
    private service: AuthService
  ) {
    this.validateForm = this.fb.group({
      nameRegister: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      userRegister: ['', [Validators.required]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
    });
  }
}
