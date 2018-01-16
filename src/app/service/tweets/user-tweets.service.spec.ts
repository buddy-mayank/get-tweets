import { TestBed, inject } from '@angular/core/testing';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Observable } from 'rxjs/Observable';

import { UserTweetsService } from './user-tweets.service';



describe('UserTweetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApolloModule,
        HttpLinkModule,
        HttpClientModule
      ],
      providers: [
        UserTweetsService,
        Apollo,
        HttpLink
      ]
    });
  });

  it('should be created', inject([UserTweetsService], (service: UserTweetsService) => {
    expect(service).toBeTruthy();
  }));
});
