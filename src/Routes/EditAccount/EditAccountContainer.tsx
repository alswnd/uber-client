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
import axios from "axios";

interface IState {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
  uploaded: boolean;
  uploading: boolean;
}

interface IProps extends RouteComponentProps<any> {}

class EditAccountContainer extends React.Component<IProps, IState> {
  public state = {
    email: "",
    firstName: "",
    lastName: "",
    profilePhoto: "",
    uploaded: false,
    uploading: false,
  };

  public render() {
    const { email, firstName, lastName, profilePhoto, uploading } = this.state;
    return (
      <Query<userProfile>
        query={USER_PROFILE}
        fetchPolicy={"cache-and-network"}
        onCompleted={this.updateFields}
      >
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
              // refetchQueries={[{ query: USER_PROFILE }]}
              // onCompleted={(data) => {
              //   const { UpdateMyProfile } = data;
              //   if (UpdateMyProfile.ok) {
              //     toast.success("Profile updated!");
              //   } else if (UpdateMyProfile.error) {
              //     toast.error(UpdateMyProfile.error);
              //   }
              // }}

              update={(cache, { data }) => {
                console.log(data);
                if (data) {
                  const { UpdateMyProfile } = data;

                  if (!UpdateMyProfile.ok) {
                    toast.error(UpdateMyProfile.error);

                    return;
                  }

                  const query: userProfile | null = cache.readQuery({
                    query: USER_PROFILE,
                  });

                  if (query) {
                    console.log(email, firstName, lastName, profilePhoto);
                    query.GetMyProfile.user!.email = email;
                    query.GetMyProfile.user!.firstName = firstName;
                    query.GetMyProfile.user!.lastName = lastName;
                    query.GetMyProfile.user!.profilePhoto = profilePhoto;
                    
                  }

                  cache.writeQuery({ query: USER_PROFILE, data: query });

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
                    uploading={uploading}
                  />
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const {
      target: { name, value, files },
    } = event;

    if (files) {
      this.setState({
        uploading: true,
      });
      /**
       * @TODO change to firebase
       * @description maybe this part could be replaced by firebase
       */
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("api_key", "811881451928618");
      formData.append("upload_preset", "tqecb16q");
      formData.append("timestamp", String(Date.now() / 1000));
      const {
        data: { secure_url },
      } = await axios.post(
        "https://api.cloudinary.com/v1_1/djjpx4ror/image/upload",
        formData
      );
      if (secure_url) {
        this.setState({
          profilePhoto: secure_url,
          uploading: false,
        });
      }
    }

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
          uploaded: profilePhoto !== null,
        } as any);
      }
    }
  };
}

export default EditAccountContainer;
