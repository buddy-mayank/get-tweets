import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginGuardService } from './login/login-guard.service';
import { CallbackComponent } from './callback/callback.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


export const ROUTES: Routes = [
  {path: 'login', canActivate: [LoginGuardService], component: LoginComponent},
  {path: 'callback', component: CallbackComponent},
  {path: 'home', canActivate: [LoginGuardService], component: HomeComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];
