import React from "react";
import { RouteComponentProps } from "react-router";
import HomePresenter from "./HomePresenter";
import { Query } from "react-apollo";
import { userProfile } from "../../types/api";
import { USER_PROFILE } from "../../sharedQueries";

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
      <Query<userProfile> query={USER_PROFILE}>
        {({ loading }) => {
          return (
            <HomePresenter
              loading={loading}
              isMenuOpen={isMenuOpen}
              toggleMenu={this.toggleMenu}
            />
          );
        }}
      </Query>
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
