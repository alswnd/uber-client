import React from "react";
import PropTypes from "prop-types";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import AddPlace from "../../Routes/AddPlace";
import EditAccount from "../../Routes/EditAccount";
import FindAddress from "../../Routes/FindAddress";
import Home from "../../Routes/Home";
import OutHome from "../../Routes/OutHome";
import PhoneLogin from "../../Routes/PhoneLogin";
import Places from "../../Routes/Places";
import Ride from "../../Routes/Ride";
import Settings from "../../Routes/Settings";
import SocialLogin from "../../Routes/SocialLogin";
import VerifyPhone from "../../Routes/VerifyPhone";

interface IPorps {
  isLoggedIn: boolean;
}

// React . stateless functional component < INTERFACE > to make type react component
const AppPresenter: React.SFC<IPorps> = ({ isLoggedIn }) => (
  <BrowserRouter>
    {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
  </BrowserRouter>
);

const LoggedOutRoutes: React.SFC = () => (
  // Switch : this way or other way
  <Switch>
    <Route path={"/"} exact={true} component={OutHome} />
    <Route path={"/phone-login"} component={PhoneLogin} />
    <Route path={"/verify-phone/:number"} component={VerifyPhone} />
    <Route path={"/social-login"} component={SocialLogin} />
    <Redirect from={"*"} to={"/"} /> // it should be end
  </Switch>
);

const LoggedInRoutes: React.SFC = () => (
  // Switch : this way or other way
  <Switch>
    <Route path={"/"} exact={true} component={Home} />
    <Route path={"/ride"} exact={true} component={Ride} />
    <Route path={"/edit-account"} exact={true} component={EditAccount} />
    <Route path={"/settings"} exact={true} component={Settings} />
    <Route path={"/places"} exact={true} component={Places} />
    <Route path={"/add-place"} exact={true} component={AddPlace} />
    <Route path={"/find-address"} exact={true} component={FindAddress} />
    <Redirect from={"*"} to={"/"} />
  </Switch>
);

AppPresenter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppPresenter;
