import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, LoginResults } from '../../models/interface/auth/login';
import { Register, RegisterResults } from '../../models/interface/auth/register';
import { UserResults } from '../../models/interface/auth/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(dataLogin: Login): Observable<LoginResults> {
    return this.http.post<LoginResults>('http://localhost:3000/api/auth/login',dataLogin);
  }

  register(dataRegister: Register): Observable<RegisterResults> {
    return this.http.post<RegisterResults>('http://localhost:3000/api/users',dataRegister);
  }

  getUser(id:string): Observable<UserResults>{
    return this.http.get<UserResults>('http://localhost:3000/api/users/'+id);
  }
  
}  