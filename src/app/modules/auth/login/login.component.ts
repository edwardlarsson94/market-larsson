import { Component } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../../../services/auth/auth.service';
import { DataLogin, Login } from '../../../models/interface/auth/login';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { setShowLoginForm, setUser, clearUser } from '../../../state/app.actions';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { NzNotificationService, NzNotificationModule } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { User } from '../../../models/interface/auth/user';
import { AuthPipe } from '../../../core/pipe/auth.pipe';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    RegisterComponent,
    AsyncPipe,
    NzNotificationModule,
    JsonPipe,
    AuthPipe,
    NzInputModule,
    NzSelectModule,
    NzIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isVisible = false;
  modalFooter = null;
  showLoginForm$: Observable<boolean>;
  hiddenLoginForm$: Observable<boolean>;
  user$: Observable<User | null>;
  passwordVisible = false;

  constructor(
    private fb: NonNullableFormBuilder, 
    private service: AuthService,
    private store: Store<AppState>,
    private notification: NzNotificationService,
    private router: Router
  ) {
    this.showLoginForm$ = this.store.select(state => state.showLoginForm);
    this.hiddenLoginForm$ = this.store.select(state => state.hiddenLoginForm);
    this.user$ = this.store.select(state => state.user);

    this.hiddenLoginForm$.subscribe(hidden => {
      if (!hidden) {
        this.isVisible = false;
      }
    });
  }

  showModal(): void {
    this.isVisible = true;
    this.validateForm.reset();
    this.store.dispatch(setShowLoginForm({ show: true }));
  }

  logoutUser(): void {
    this.store.dispatch(clearUser());
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(50)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    remember: [true]
  });

  showRegisterComponent(): void {
    this.store.dispatch(setShowLoginForm({ show: false }));
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const email = this.validateForm.value.email;
      const password = this.validateForm.value.password;
      if (email !== undefined && password !== undefined) {
        const loginData: Login = {
          email: email,
          password: password
        };
        this.service.login(loginData).subscribe({
          next: (response) => {
            if(response){
              this.isVisible = false;
              this.getDataUser(response?.data);
              this.createNotification(
                "success",
                "Welcome aboard!",
                "Hello there! 🎉 You've successfully logged in. Thanks for joining us on this journey. Explore away!"
              )
            }else{
              this.createNotification(
                "error",
                "Oops! Something Went Wrong",
                `Uh-oh! It seems like there was an issue during login.`
              )
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
      } else {
        this.createNotification(
          "error",
          "Oops! Something Went Wrong",
          `Email or password is undefined`
        )
      }
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  validateUser(data: string | undefined): void {
    if (data) {
      if (data === 'admin') {
        this.router.navigate(['/admin/products']);
      }
    }
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
            this.validateUser(user.role);
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

  createNotification(type: string, title: string, description: string): void {
    this.notification.create(
      type,
      title,
      description
    );
  }
}
