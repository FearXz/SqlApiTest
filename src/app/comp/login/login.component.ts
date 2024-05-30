import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../../interfaces/Login';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;

  constructor(private authSvc: AuthService, private router: Router) {}

  submitLogin() {
    let loginData: Login = {
      username: this.username,
      password: this.password,
    };

    this.authSvc.login(loginData).subscribe((isLoggedIn) => {
      if (isLoggedIn) this.router.navigate(['/tasks']);
    });
  }

  ngOnInit(): void {
    this.authSvc;
  }
}
