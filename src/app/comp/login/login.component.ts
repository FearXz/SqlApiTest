import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../../interfaces/Login';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private authSvc: AuthService, private router: Router) {}

  submitLogin() {
    let loginData: Login = {
      username: this.username,
      password: this.password,
    };

    this.authSvc.login(loginData).subscribe((user) => {
      if (!user) return;

      let expires = new Date(Date.now() + 1000 * 60 * 30);
      Cookies.set('user', JSON.stringify(user), { expires });
      this.router.navigate(['/tasks']);
    });
  }
}
