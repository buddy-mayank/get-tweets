import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UserTweetsService } from '../service/tweets/user-tweets.service';
import { AuthService } from '../service/auth/auth.service';

import { HomeComponent } from './home.component';
import { LoginComponent } from '../login/login.component';
import { LoginGuardService } from '../login/login-guard.service';
import { CallbackComponent } from '../callback/callback.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from '../app.routes';
import { APP_BASE_HREF } from '@angular/common';
import { Observable } from 'rxjs/Observable';


class MockAuthService {
  public mockName: string = 'Mocked Service';
}

class MockUserTweetsService {
  public mockName: string = 'Mocked Service';
  mockUser = {
    "user": {
      "created_at": "Thu Feb 26 12:38:48 +0000 2015",
      "description": "ICTS is a multi- & inter-disciplinary effort with a mandate to take new initiatives on the frontiers of science, & catalyze & promote collaboration in research.",
      "id": "3043420364",
      "screen_name": "ictstifr",
      "name": "ICTS",
      "profile_image_url": "http://pbs.twimg.com/profile_images/570930964881104896/hlhHpi6m_normal.png",
      "url": "https://t.co/mXP8NvUXyV",
      "tweets_count": 48,
      "followers_count": 462,
      "tweets": [
        {
          "text": "join us for #kaapi with kuriosity talk BLACK HOLES by Ramesh Narayan, on Sunday, Jan 21st, 4 pm at the Jawaharlal N… https://t.co/OxyPkzdPqV"
        },
        {
          "text": "Prof. Hirosi Ooguri will explain the science of THE MAN FROM THE 9 DIMENSIONS at the J N Planetarium, today at 6:… https://t.co/rh8EdIlYBb"
        }
      ]
    }
};

  public getUserTweet() {
    return Observable.create( () => this.mockUser);
  }
}


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userTweetService: UserTweetsService;
  let mockUser: Object;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
            ReactiveFormsModule,
            FormsModule,
            RouterModule.forRoot(ROUTES)
          ],
      declarations: [
            HomeComponent,
            LoginComponent,
            CallbackComponent,
            PageNotFoundComponent
      ],
      providers: [
        {provide: AuthService, useClass: MockAuthService},
        {provide: UserTweetsService, useClass: MockUserTweetsService},
        {provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    component.ngOnInit();

    mockUser = {
          "user": {
            "created_at": "Thu Feb 26 12:38:48 +0000 2015",
            "description": "ICTS is a multi- & inter-disciplinary effort with a mandate to take new initiatives on the frontiers of science, & catalyze & promote collaboration in research.",
            "id": "3043420364",
            "screen_name": "ictstifr",
            "name": "ICTS",
            "profile_image_url": "http://pbs.twimg.com/profile_images/570930964881104896/hlhHpi6m_normal.png",
            "url": "https://t.co/mXP8NvUXyV",
            "tweets_count": 48,
            "followers_count": 462,
            "tweets": [
              {
                "text": "join us for #kaapi with kuriosity talk BLACK HOLES by Ramesh Narayan, on Sunday, Jan 21st, 4 pm at the Jawaharlal N… https://t.co/OxyPkzdPqV"
              },
              {
                "text": "Prof. Hirosi Ooguri will explain the science of THE MAN FROM THE 9 DIMENSIONS at the J N Planetarium, today at 6:… https://t.co/rh8EdIlYBb"
              }
            ]
          }
      };

      // userTweetService = fixture.debugElement.injector.get(UserTweetService);
  });

  it('should create HomeComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Username field should be empty', () => {
    expect(component.getTweetForm.get('username').value).toEqual("");
  });

  it('Username field should be valid', () => {
    let errors = {};
    let usernameCtl = component.getTweetForm.get('username');

    // username field is required
    errors = usernameCtl.errors || {};
    expect(errors['required']).toBeTruthy();

    // username field is valid
    usernameCtl.setValue('icts_tifr');
    expect(usernameCtl.valid).toBeTruthy();

    // username field should not be more than 15 characters
    usernameCtl.setValue('valueismorethan15charctersssssssssssssss');
    errors = usernameCtl.errors || {};
    console.log(errors);
    expect(errors['maxlength']).toBeTruthy();

    //  username field should comply with the pattern
    usernameCtl.setValue('@@');
    errors = usernameCtl.errors || {};
    console.log(errors);
    expect(errors['pattern']).toBeTruthy();
  });
});
