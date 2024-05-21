import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../../models/interface/auth/login';
import { Register } from '../../models/interface/auth/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(dataLogin: Login): Observable<Login> {
    return this.http.post<Login>('http://localhost:3000/api/auth/login',dataLogin);
  }

  register(dataRegister: Register): Observable<Login> {
    return this.http.post<Login>('http://localhost:3000/api/users',dataRegister);
  }
  
}  