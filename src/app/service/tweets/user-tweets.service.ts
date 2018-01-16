import { Injectable } from '@angular/core';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

const getUserTweets = gql`
  query getUserTweets ($identity: UserIdentity!) {
    graphQLHub
    twitter {
      user(identifier: name, identity: $identity) {
        created_at
        description
        id
        screen_name
        name
        profile_image_url
        url
        tweets_count
        followers_count
        tweets(limit: 10) {
          text
        }
      }
    }
  }
`;

@Injectable()
export class UserTweetsService {

  constructor(public apollo: Apollo,
    public httpLink: HttpLink) {
      apollo.create({
        link: httpLink.create({ uri: environment.graphqlURI }),
        cache: new InMemoryCache()
      });
    }

    getUserTweets(username: string): Observable<any> {
      return this.apollo.query<any>({
        query: getUserTweets,
        variables: {
          identity: username
        }
      });
    }
}
