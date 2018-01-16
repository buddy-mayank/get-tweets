import { TestBed, fakeAsync, async, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location, APP_BASE_HREF } from '@angular/common';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Observable } from 'rxjs/Observable';

import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginGuardService } from './login/login-guard.service';
import { CallbackComponent } from './callback/callback.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthService } from './service/auth/auth.service';
import { UserTweetsService } from './service/tweets/user-tweets.service';


describe('Router: App', () => {
  let location: Location,
  router: Router,
  loginGuard: LoginGuardService;

  let fixture;

  beforeEach(async(() => {
    let mockAuthService = {
      isAuthenticated: () => true,
      handleAuthentication: () => {},
    };

    TestBed.configureTestingModule({
      imports: [
        ApolloModule,
        HttpLinkModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(ROUTES),
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        { provide: AuthService, useValue: mockAuthService },
        LoginGuardService,
        UserTweetsService,
        Apollo,
        HttpLink
      ],
      declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        LoginComponent,
        CallbackComponent,
        PageNotFoundComponent,
      ]
    })
    .compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent);

    loginGuard = TestBed.get(LoginGuardService);

    router.initialNavigation();
  }));

  it('should be able to hit route when user is logged in', fakeAsync(() => {
    expect(loginGuard.canActivate()).toBe(true);
  }));

  it('navigate to "" takes you to /login', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/login');
  }));

  it('navigate to "login" takes you to /login', fakeAsync(() => {
    router.navigate(['login']);
    tick();
    expect(location.path()).toBe('/login');
  }));

  it('navigate to "home" takes you to /home', fakeAsync(() => {
    router.navigate(['home']);
    tick();
    expect(location.path()).toBe('/home');
  }));
});
