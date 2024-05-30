import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import Cookies from 'js-cookie';
import { User } from '../../interfaces/User';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const user: User = JSON.parse(Cookies.get('user') || '{}');

    if (user.token) {
      const newRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return next.handle(newRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // se l'errore è 401 Unauthorized, reindirizza all'utente alla pagina di login
            this.router.navigate(['/login']);
          }
          throw error;
        })
      );
    }
    return next.handle(request);
  }
}

export const jwtInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true,
};
