import { Injectable } from '@angular/core';
import { User } from '../../interfaces/User';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../interfaces/Login';
import { URL } from '../utility/serverInfo';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User | null = null;
  userCookie$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    this.user
  );

  constructor(private http: HttpClient) {
    this.checkCookie();
  }

  login(loginData: Login): Observable<boolean> {
    return this.http.post<User>(`${URL}/auth/login`, loginData).pipe(
      map((user) => {
        if (!user) return false;

        let expires = new Date(Date.now() + 1000 * 60 * 30);
        Cookies.set('user', JSON.stringify(user), { expires });
        this.user = user;
        this.userCookie$.next(this.user);

        return true;
      })
    );
  }

  isAuthenticated(): boolean {
    const user = Cookies.get('user');
    return user ? true : false;
  }

  checkCookie(): void {
    const user = Cookies.get('user');
    if (user) this.userCookie$.next(JSON.parse(user));
    else this.userCookie$.next(null);
  }
}
