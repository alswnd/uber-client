import React from "react";
import { Mutation, Query } from "react-apollo";
import { USER_PROFILE, GET_PLACES } from "../../sharedQueries";
import { LOG_USER_OUT } from "../../sharedQueries.local";
import { userProfile, getPlaces } from "../../types/api";
import SettingsPresenter from "./SettingsPresenter";

class SettingsContainer extends React.Component {
  public render() {
    return (
      <Mutation mutation={LOG_USER_OUT}>
        {(logUserOut) => {
          // logUserOut : from LOG_USER_OUT and to presenter
          return (
            <Query<userProfile> query={USER_PROFILE}>
              {({ data: userData, loading: userDataLoading }) => {
                return (
                  <Query<getPlaces> query={GET_PLACES}>
                    {({ data: placesData, loading: placesLoading }) => {
                      return (
                        <SettingsPresenter
                          userDataLoading={userDataLoading}
                          userData={userData}
                          placesLoading={placesLoading}
                          placesData={placesData}
                          logUserOut={logUserOut}
                        />
                      );
                    }}
                  </Query>
                );
              }}
            </Query>
          );
        }}
      </Mutation>
    );
  }
}

export default SettingsContainer;
