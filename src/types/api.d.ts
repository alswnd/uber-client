/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: startPhoneVerification
// ====================================================

export interface startPhoneVerification_StartPhoneVerification {
  __typename: "StartPhoneVerificationResponse";
  ok: boolean;
  error: string | null;
}

export interface startPhoneVerification {
  StartPhoneVerification: startPhoneVerification_StartPhoneVerification;
}

export interface startPhoneVerificationVariables {
  phoneNumber: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: facebookConnect
// ====================================================

export interface facebookConnect_FacebookConnect {
  __typename: "FacebookConnectResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface facebookConnect {
  FacebookConnect: facebookConnect_FacebookConnect;
}

export interface facebookConnectVariables {
  firstName: string;
  lastName: string;
  email?: string | null;
  fbId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: verifyPhone
// ====================================================

export interface verifyPhone_CompletPhoneNumberVerification {
  __typename: "CompletPhoneNumberVerificationResponse";
  ok: boolean;
  error: string | null;
  /**
   * for existing user
   */
  token: string | null;
}

export interface verifyPhone {
  CompletPhoneNumberVerification: verifyPhone_CompletPhoneNumberVerification;
}

export interface verifyPhoneVariables {
  key: string;
  phoneNumber: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
