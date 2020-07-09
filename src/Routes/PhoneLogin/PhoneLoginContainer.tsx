import React from "react";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { Mutation } from "react-apollo";
import { PHONE_SIGN_IN } from "./PhoneQueries.queries";
import {
  startPhoneVerificationVariables,
  startPhoneVerification,
} from "../../types/api";
import { MutationUpdaterFn } from "apollo-boost";

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

          if (StartPhoneVerification.ok) {
            // starts
            console.log(data);
            return;
          } else {
            // fail
            toast.error(StartPhoneVerification.error);
          }
        }}
      >
        {(mutation, { loading }) => {
          // on submit
          const onSumbit: React.FormEventHandler<HTMLFormElement> = (event) => {
            event.preventDefault();

            const phone = `${countryCode}${phoneNumber}`;

            const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(phone);

            // if phone number valid
            if (isValid) {
              // mutation();
              history.push({
                // it is better user var for url
                // not like this
                pathname: "/verify-phone",
                state: {
                  phone,
                },
              });
            } else {
              toast.error("Invalid number");
            }
          };
          return (
            <PhoneLoginPresenter
              countryCode={countryCode}
              phoneNumber={phoneNumber}
              onInputChange={this.onInputChange}
              onSumbit={onSumbit}
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
}

export default PhoneLoginContainer;
