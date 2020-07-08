import React from "react";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { Mutation } from "react-apollo";
import { PHONE_SIGN_IN } from "./PhoneQueries";

// we have no props
// interface IProps extends RouteComponentProps<any> {}

interface IState {
  countryCode: string;
  phoneNumber: string;
}

interface IMutationInterface {
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
    const { countryCode, phoneNumber } = this.state;

    return (
      <Mutation<any, IMutationInterface>
        // mutation
        mutation={PHONE_SIGN_IN}
        variables={{
          phoneNumber: `${countryCode}${phoneNumber}`,
        }}
      >
        {(mutation, { loading }) => {
          // on submit
          const onSumbit: React.FormEventHandler<HTMLFormElement> = (event) => {
            event.preventDefault();
            
            const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(
              `${countryCode}${phoneNumber}`
            );

            // if phone number valid
            if (isValid) {
              mutation();
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
