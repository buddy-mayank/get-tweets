import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import { AuthService } from '../service/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

import {UserTweetsService} from '../service/tweets/user-tweets.service';

import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;
  getTweetForm: FormGroup;
  errorMessage: string;
  private sub: Subscription;
  public appStatus = 0; /* 0(initial state), 1 (loading), 2 (loading complete) */

  constructor(public auth: AuthService,
    public route: ActivatedRoute,
    public fb: FormBuilder,
    public tweetService: UserTweetsService) {
  }

  ngOnInit() {
    this.getTweetForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(15), Validators.pattern('[a-zA-Z0-9_]+')]]
    });

    this.sub = this.route.queryParams.subscribe( params => {
      let username = params['username'] || 0;

      if (username) {
        // set the form username field value
        this.getTweetForm.setValue({
          username: username
        });
        this.getUserTweets(username);
      }
    });
  }

  /* submit form funtion */
  getTweetsSubmit(): void {
    const username: string = this.getTweetForm.get('username').value;
    this.getUserTweets(username);
  }

  /* This method calls the getUserTweets() of UserTweetsService */
  getUserTweets(username): void {
    this.appStatus = 1;
    this.tweetService.getUserTweets(username).subscribe(
      data => {
        this.errorMessage = '';
        this.user = data.data.twitter.user;
        this.appStatus = 2;
      },
      error => {
        this.user = null;
        this.errorMessage = error.message.split(':').pop();
        this.appStatus = 2;
      });
  }
}
