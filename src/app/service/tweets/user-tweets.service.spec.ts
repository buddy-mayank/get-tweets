import { TestBed, inject } from '@angular/core/testing';

import { UserTweetsService } from './user-tweets.service';

describe('UserTweetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserTweetsService]
    });
  });

  it('should be created', inject([UserTweetsService], (service: UserTweetsService) => {
    expect(service).toBeTruthy();
  }));
});
