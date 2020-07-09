import { gql } from "apollo-boost";

export const VERIFY_PHONE = gql`
  mutation verifyPhone($key: String!, $phoneNumber: String!) {
    CompletPhoneNumberVerification(key: $key, phoneNumber: $phoneNumber) {
      ok
      error
      token
    }
  }
`;
