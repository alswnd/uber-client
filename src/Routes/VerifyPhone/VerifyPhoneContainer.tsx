import React from "react";
import { RouteComponentProps } from "react-router-dom";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { verifyPhone, verifyPhoneVariables } from "../../types/api";
import { Mutation } from "react-apollo";
import { VERIFY_PHONE } from "./VerifyPhoneQueries";
import { toast } from "react-toastify";

interface IState {
  verificationKey: string;
  phoneNumber: string;
}

interface IProps extends RouteComponentProps<any> {
  // add because typescript dont believe that props.location is
  location: any;
  history: any;
}

class VerifyPhoneContainer extends React.Component<IProps, IState> {
  // props from who called this VerifyPhone
  constructor(props: IProps) {
    super(props);
    console.log(props);
    if (!props.location.state) {
      props.history.push("/");
    }

    this.state = {
      verificationKey: "",
      phoneNumber: props.location.state.phone,
    };
  }

  public render() {
    const { verificationKey } = this.state;
    return (
      <Mutation<verifyPhone, verifyPhoneVariables>
        mutation={VERIFY_PHONE}
        variables={{
          key: verificationKey,
          phoneNumber: this.state.phoneNumber,
        }}
        onCompleted={(data) => {
          const { CompletPhoneNumberVerification } = data;

          if (CompletPhoneNumberVerification.ok) {
            toast.success("Welcome! logging...");
          } else {
            toast.error(CompletPhoneNumberVerification.error);
          }
        }}
      >
        {(mutation, { loading }) => {
          const onSumbit: React.FormEventHandler<HTMLFormElement> = (event) => {
            event.preventDefault();
            mutation();
          };

          return (
            <VerifyPhonePresenter
              onSubmit={mutation}
              onChange={this.onInputChange}
              verificationKey={verificationKey}
              loading={loading}
            />
          );
        }}
      </Mutation>
    );
  }

  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const {
      target: { name, value },
    } = event;
    this.setState({
      [name]: value,
    } as any);
  };
}

export default VerifyPhoneContainer;
