import { gql } from "apollo-boost";

// first logUserIn is just for this component
// second logUserIn is apollo resolver
export const LOG_USER_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;

export const LOG_USER_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;
