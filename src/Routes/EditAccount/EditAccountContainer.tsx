import React from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import {
  updateProfile,
  updateProfileVariables,
  userProfile,
} from "../../types/api";
import EditAccountPresenter from "./EditAccountPresenter";
import { UPDATE_PROFILE } from "./EditAccountQueries";
import { USER_PROFILE } from "../../sharedQueries";
import { toast } from "react-toastify";

interface IState {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
}

interface IProps extends RouteComponentProps<any> {}

class EditAccountContainer extends React.Component<IProps, IState> {
  public state = {
    email: "",
    firstName: "",
    lastName: "",
    profilePhoto: "",
  };

  public render() {
    const { email, firstName, lastName, profilePhoto } = this.state;
    return (
      <Query<userProfile> query={USER_PROFILE} onCompleted={this.updateFields}>
        {() => {
          // no need data, loading
          return (
            <Mutation<updateProfile, updateProfileVariables>
              mutation={UPDATE_PROFILE}
              variables={{
                email,
                firstName,
                lastName,
                profilePhoto,
              }}
              update={(cache, { data }) => {
                if (data) {
                  const { UpdateMyProfile } = data;

                  if (UpdateMyProfile.error) {
                    toast.error(UpdateMyProfile.error);

                    return;
                  }

                  const query: userProfile | null = cache.readQuery({
                    query: USER_PROFILE,
                  });

                  if (query) {
                    console.log(query.GetMyProfile.user!.lastName);
                    console.log(lastName);
                    query.GetMyProfile.user!.email = email;
                    query.GetMyProfile.user!.firstName = firstName;
                    query.GetMyProfile.user!.lastName = lastName;
                  }

                  cache.writeQuery({ query: USER_PROFILE, data: query });

                  if (query) console.log(query.GetMyProfile.user!.lastName);

                  toast.success("Profile Updated");
                }
              }}
            >
              {(updateProfileFn, { loading }) => {
                return (
                  <EditAccountPresenter
                    email={email}
                    firstName={firstName}
                    lastName={lastName}
                    profilePhoto={profilePhoto}
                    onInputChange={this.onInputChange}
                    loading={loading}
                    onSubmit={updateProfileFn}
                  />
                );
              }}
            </Mutation>
          );
        }}
      </Query>
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

  public updateFields = (data: {} | userProfile) => {
    if ("GetMyProfile" in data) {
      const {
        GetMyProfile: { user },
      } = data;
      if (user !== null) {
        const { firstName, lastName, email, profilePhoto } = user;
        this.setState({
          email,
          firstName,
          lastName,
          profilePhoto,
        } as any);
      }
    }
  };
}

export default EditAccountContainer;
