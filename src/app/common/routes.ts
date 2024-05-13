import { Routes } from '@angular/router';
import { LoginComponent } from '../auth/containers/login/login.component';
import { RegisterComponent } from '../auth/containers/register/register.component';

export const mainRoutes: Routes = [];

export const authRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];