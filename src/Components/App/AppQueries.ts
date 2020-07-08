import { gql } from "apollo-boost";

// query
// @client means it sends not to api, but to cache
export const IS_LOGGED_IN = gql`
  {
    auth {
      isLoggedIn @client
    }
  }
`;
