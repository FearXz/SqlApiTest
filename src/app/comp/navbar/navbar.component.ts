import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../interfaces/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  user: User | null = null;

  constructor(private authSvc: AuthService) {}

  logout(): void {
    this.authSvc.logout();
  }

  ngOnInit(): void {
    this.authSvc.userCookie$.subscribe((user) => {
      this.user = user;
    });
  }
}
