import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, LoginResults } from '../../models/interface/auth/login';
import { Register, RegisterResults } from '../../models/interface/auth/register';
import { UserResults } from '../../models/interface/auth/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(dataLogin: Login): Observable<LoginResults> {
    return this.http.post<LoginResults>(`${this.apiUrl}/auth/login`, dataLogin);
  }

  register(dataRegister: Register): Observable<RegisterResults> {
    return this.http.post<RegisterResults>(`${this.apiUrl}/users`, dataRegister);
  }

  getUser(id: string): Observable<UserResults> {
    return this.http.get<UserResults>(`${this.apiUrl}/users/${id}`);
  }
}