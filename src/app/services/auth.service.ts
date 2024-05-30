import { Injectable } from '@angular/core';
import { User } from '../../interfaces/User';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../interfaces/Login';
import { URL } from '../utility/serverInfo';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User;

  constructor(private http: HttpClient) {
    this.user = {} as User;
  }

  login(loginData: Login): Observable<User> {
    return this.http.post<User>(`${URL}/login`, loginData);
  }
}
