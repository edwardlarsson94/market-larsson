import { Component } from '@angular/core';
import { NzFormModule, NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { setHiddenLoginForm, setShowLoginForm, setUser } from '../../../state/app.actions';

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
import { DataLogin, Login } from '../../../models/interface/auth/login';
import { User } from '../../../models/interface/auth/user';

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
    email: FormControl<string>;
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
          );
          const loginData: Login = {
            email: registerData.email,
            password: registerData.password
          };
          this.service.login(loginData).subscribe({
            next: (response) => {
              if (response) {
                this.getDataUser(response?.data);
                this.store.dispatch(setHiddenLoginForm({ show: false }));
              }
            },
            error: (error) => {
              let messageError = '';
              let codeError = '';
              if(error?.error){
                messageError = error?.error?.errors?.message;
                codeError = error?.error?.errors?.code;
              }
              this.createNotification(
                "error",
                "Oops! Something Went Wrong",
                `Uh-oh! It seems like there was an issue during Register. ${messageError}. ${codeError}`
              )            }
          });
        },
        error: (error) => {
          let messageError = '';
          let codeError = '';
          if(error?.error){
            messageError = error?.error?.errors?.message;
            codeError = error?.error?.errors?.code;
          }
          this.createNotification(
            "error",
            "Oops!! Something Went Wrong",
            `Uh-oh! It seems like there was an issue during Register. ${messageError}. ${codeError}`
          )
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
    this.store.dispatch(setHiddenLoginForm({ show: false }));
  }

  getDataUser(data: DataLogin | undefined): void {
    if (data?.id) {
      this.service.getUser(data?.id).subscribe({
        next: (response) => {
          if(response?.data){
            const user: User = {
              id: response.data.id,
              fullName: 'No Name',
              email: response.data.email,
              user: '',
              password: '',
              role: response.data.role
            };
            this.store.dispatch(setUser({ user }));
          }
        },
        error: (error) => {
          let messageError = '';
          let codeError = '';
          if(error?.error){
            messageError = error?.error?.errors?.message;
            codeError = error?.error?.errors?.code;
          }
          this.createNotification(
            "error",
            "Oops! Something Went Wrong",
            `Uh-oh! It seems like there was an issue during login. ${messageError}. ${codeError}`
          )
        }
      });
    }
  }

  updateConfirmValidator(): void {
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

  createNotification(type: string, title: string, description: string): void {
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
    private notification: NzNotificationService,
  ) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
    });
  }
}
