import { Component } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators,  ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../../../services/auth/auth.service';
import { DataLogin, Login } from '../../../models/interface/auth/login';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { setShowLoginForm, setUser } from '../../../state/app.actions';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { User } from '../../../models/interface/auth/user';

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
    NzNotificationModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isVisible = false;
  modalFooter = null;
  showLoginForm$: Observable<boolean>;
  
  showModal(): void {
    this.isVisible = true;
  }

  logoutUser(): void {
    console.log('test');
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  showRegisterComponent(): void {
    this.store.dispatch(setShowLoginForm({ show: false }));
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const userName = this.validateForm.value.userName;
      const password = this.validateForm.value.password;
      if (userName !== undefined && password !== undefined) {
        const loginData: Login = {
          nickName: userName,
          password: password
        };
        this.service.login(loginData).subscribe({
          next: (response) => {
            if(response){
              this.isVisible = false;
              this.validateUser(response?.data);
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
          `Username or password is undefined`
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

  validateUser(data: DataLogin | undefined): void {
      if (data?.role) {
        if (data.role === 'admin') {
          this.router.navigate(['/admin']);
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
                fullName: response.data.fullName,
                email: response.data.email,
                user: response.data.user,
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

  createNotification(type: string,title:string,description:string): void {
    this.notification.create(
      type,
      title,
      description
    );
  }

  constructor(
    private fb: NonNullableFormBuilder, 
    private service: AuthService,
    private store: Store<AppState>,
    private notification: NzNotificationService,
    private router: Router
  ) {
    this.showLoginForm$ = this.store.select(state => state.showLoginForm);
  }
}
