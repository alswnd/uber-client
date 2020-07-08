import React from "react";
import PropTypes from "prop-types";

interface IPorps {
  isLoggedIn: boolean;
}

// React . stateless functional component < INTERFACE > to make type react component
const AppPresenter: React.SFC<IPorps> = ({ isLoggedIn }) =>
  isLoggedIn ? <span>you are in</span> : <span>you are out</span>;

AppPresenter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppPresenter;
