import React from "react";
import MenuPresenter from "./MenuPresenter";
import { Query, Mutation } from "react-apollo";
import { userProfile, toggleDriver } from "../../types/api";
import { USER_PROFILE } from "../../sharedQueries";
import { TOGGLE_DRIVER } from "./MenuQueries";
import { toast } from "react-toastify";

class MenuContainer extends React.Component {
  public render() {
    return (
      <Mutation<toggleDriver>
        mutation={TOGGLE_DRIVER}
        // refetchQueries : when queries(array) are done, refetch automatically. it is touching API.
        // refetchQueries={[{ query: USER_PROFILE }]}

        // it is not touching API.
        update={(cache, { data }) => {
          if (data) {
            const { ToggleDriverMode } = data;

            if (!ToggleDriverMode.ok) {
              toast.error(ToggleDriverMode.error);

              return;
            }

            // execute query to get user profile from cache
            const query: userProfile | null = cache.readQuery({
              query: USER_PROFILE,
            });

            // update isDriving
            if (query)
              query.GetMyProfile.user!.isDriving = !query.GetMyProfile.user!
                .isDriving;

            // write query
            cache.writeQuery({ query: USER_PROFILE, data: query });
          }
        }}
      >
        {(toggleDriverFn) => {
          return (
            <Query<userProfile> query={USER_PROFILE}>
              {({ data, loading }) => {
                return (
                  <MenuPresenter
                    data={data}
                    loading={loading}
                    toggleDriverFn={toggleDriverFn}
                  />
                );
              }}
            </Query>
          );
        }}
      </Mutation>
    );
  }
}

export default MenuContainer;
