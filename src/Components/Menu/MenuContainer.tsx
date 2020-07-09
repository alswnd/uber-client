import React from "react";
import MenuPresenter from "./MenuPresenter";
import { Query } from "react-apollo";
import { userProfile } from "../../types/api";
import { USER_PROFILE } from "../../sharedQueries";

class MenuContainer extends React.Component {
  public render() {
    return (
      <Query<userProfile> query={USER_PROFILE}>
        {({ data, loading }) => {
          return <MenuPresenter data={data} loading={loading} />;
        }}
      </Query>
    );
  }
}

export default MenuContainer;
