import { Component } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators,  ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../../../services/auth/auth.service';
import { Login } from '../../../models/interface/auth/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    RegisterComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isVisible = false;
  modalFooter = null;

  showModal(): void {
    this.isVisible = true;
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
            console.log('Login response:', response);
            if(response){
              this.isVisible = false;
            }
          },
          error: (error) => {
            console.error('Error logging in:', error);
          }
        });
      } else {
        console.error('Username or password is undefined');
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

  constructor(private fb: NonNullableFormBuilder, private service: AuthService) {}

}
