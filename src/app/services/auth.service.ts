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
  // il metodo login prende un oggetto di tipo Login e restituisce un Observable di tipo boolean
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
  // il metodo logout rimuove il cookie 'user' e imposta user a null
  logout(): void {
    Cookies.remove('user');
    this.user = null;
    this.userCookie$.next(this.user);
  }

  //isAuthenticated() restituisce un booleano che indica se l'utente è autenticato o meno
  isAuthenticated(): boolean {
    const user = Cookies.get('user');
    return user ? true : false;
  }
  // checkCookie() controlla se esiste un cookie con il nome 'user' e se esiste lo imposta come valore di userCookie$
  checkCookie(): void {
    const user = Cookies.get('user');
    if (user) this.userCookie$.next(JSON.parse(user));
    else this.userCookie$.next(null);
  }
}
