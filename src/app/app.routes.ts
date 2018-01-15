import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginGuardService } from './login/login-guard.service';


export const ROUTES: Routes = [
  {path: 'login', canActivate: [LoginGuardService], component: LoginComponent},
  {path: 'home', canActivate: [LoginGuardService], component: HomeComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];
