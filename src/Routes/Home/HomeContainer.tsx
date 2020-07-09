import React from "react";
import { RouteComponentProps } from "react-router";
import HomePresenter from "./HomePresenter";

interface IState {
  isMenuOpen: boolean;
}

// no props
interface IProps extends RouteComponentProps<any> {}

class HomeContainer extends React.Component<IProps, IState> {
  // default value
  public state = {
    isMenuOpen: false,
  };

  public render() {
    const { isMenuOpen } = this.state;
    return (
      <HomePresenter isMenuOpen={isMenuOpen} toggleMenu={this.toggleMenu} />
    );
  }

  // toggle Menu
  public toggleMenu = () => {
    this.setState((state) => {
      return {
        isMenuOpen: !state.isMenuOpen,
      };
    });
  };
}

export default HomeContainer;
