import React from "react";
import { RouteComponentProps } from "react-router-dom";
import VerifyPhonePresenter from "./VerifyPhonePresenter";

interface IState {
  key: string;
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
  }
  public render() {
    const { key } = this.state;
    return <VerifyPhonePresenter onChange={this.onInputChange} key={key} />;
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
