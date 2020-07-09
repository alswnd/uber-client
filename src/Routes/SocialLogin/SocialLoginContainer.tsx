import React from "react";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { Mutation, MutationFunction } from "react-apollo";
import { facebookConnect, facebookConnectVariables } from "../../types/api";
import { FACEBOOK_CONNECT } from "./SocialLoginQueries";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../sharedQueries.local";

interface IState {
  firstName: string;
  lastName: string;
  email?: string;
  fbId: string;
}

// have no props but just for sure
interface IProps extends RouteComponentProps<any> {}

class SocialLoginContainer extends React.Component<IProps, IState> {
  public facebookMutation!: MutationFunction<
    facebookConnect,
    facebookConnectVariables
  >;

  public render() {
    const { firstName, lastName, email, fbId } = this.state || {
      firstName: "",
      lastName: "",
      email: "",
      fbId: "",
    };

    return (
      <Mutation mutation={LOG_USER_IN}>
        {(logUserIn) => (
          <Mutation<facebookConnect, facebookConnectVariables>
            mutation={FACEBOOK_CONNECT}
            variables={{
              firstName,
              lastName,
              email,
              fbId,
            }}
            onCompleted={(data) => {
              // refer api.d.ts
              const { FacebookConnect } = data;

              if (FacebookConnect.ok) {
                logUserIn({
                  variables: {
                    token: FacebookConnect.token,
                  },
                });
              } else {
                toast.error(FacebookConnect.error);
              }
            }}
          >
            {(facebookMutation, { loading }) => {
              this.facebookMutation = facebookMutation;

              // we have a call back in <FacebookLogin>
              return (
                <SocialLoginPresenter loginCallback={this.loginCallback} />
              );
            }}
          </Mutation>
        )}
      </Mutation>
    );
  }

  /**
   * this is different way to set state with VerifyPhoneContainer.tsx.
   * we put out logics outside
   *
   * @param response from facebook api
   */
  public loginCallback = (response) => {
    const { name, first_name, last_name, email, id, accessToken } = response;

    // login succeed
    if (accessToken) {
      toast.success(`Welcome ${name}!`);

      this.facebookMutation({
        variables: {
          firstName: first_name,
          lastName: last_name,
          email,
          fbId: id,
        },
      });
    } else {
      toast.error("Could not log in with the facebook ID");
    }
  };
}

export default SocialLoginContainer;
