import React from "react";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { Mutation, MutationFunction } from "react-apollo";
import { PHONE_SIGN_IN } from "./PhoneQueries";
import {
  startPhoneVerificationVariables,
  startPhoneVerification,
} from "../../types/api";

// we have no props
// interface IProps extends RouteComponentProps<any> {}

interface IState {
  countryCode: string;
  phoneNumber: string;
}

class PhoneLoginContainer extends React.Component<
  RouteComponentProps<any>, // props (if hava props.. IProps)
  IState // state
> {
  public phoneMutation!: MutationFunction<
    startPhoneVerification,
    startPhoneVerificationVariables
  >;

  public state = {
    countryCode: "+82",
    phoneNumber: "",
  };

  public render() {
    // given by react router
    const { history } = this.props;
    const { countryCode, phoneNumber } = this.state;

    return (
      <Mutation<startPhoneVerification, startPhoneVerificationVariables>
        // mutation
        mutation={PHONE_SIGN_IN}
        variables={{
          phoneNumber: `${countryCode}${phoneNumber}`,
        }}
        onCompleted={(data) => {
          /**
           * start phone verification with input number
           */
          const { StartPhoneVerification } = data;
          const phone = `${countryCode}${phoneNumber}`;

          if (StartPhoneVerification.ok) {
            // starts

            toast.success("SMS Sent! Redirecting you...");

            // redirect after 2 secs
            setTimeout(() => {
              // route and pass params
              history.push({
                pathname: "/verify-phone",
                state: {
                  phone,
                },
              });
            }, 2000);
          } else {
            // fail
            toast.error(StartPhoneVerification.error);
          }
        }}
      >
        {(phoneMutation, { loading }) => {
          // on submit
          return (
            <PhoneLoginPresenter
              countryCode={countryCode}
              phoneNumber={phoneNumber}
              onInputChange={this.onInputChange}
              onSumbit={this.onSumbit}
              loading={loading}
            />
          );
        }}
      </Mutation>
    );
  }

  /**
   * we can do something when change event occur
   *
   * @type HTMLInputElement | HTMLSelectElement
   */
  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    const {
      // name: name property in input and select
      // value : same
      target: { name, value },
    } = event;

    this.setState({
      // [name] can be countryCode or phoneNumber
      [name]: value,
    } as any);
  };

  public onSumbit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const { countryCode, phoneNumber } = this.state;
    const phone = `${countryCode}${phoneNumber}`;

    const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(phone);

    // if phone number valid
    if (isValid) {
      this.phoneMutation();
    } else {
      toast.error("Invalid number");
    }
  };
}

export default PhoneLoginContainer;
