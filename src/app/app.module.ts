import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './comp/navbar/navbar.component';
import { LoginComponent } from './comp/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TasksComponent } from './comp/tasks/tasks.component';
import { jwtInterceptorProvider } from './utility/jwt.interceptor';
import { HomeComponent } from './comp/home/home.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, LoginComponent, TasksComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [jwtInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
