import React from "react";
import { graphql } from "react-apollo";
import { IS_LOGGED_IN } from "./AppQueries";
import AppPresenter from "./AppPresenter";

const AppContainer: any = ({ data }) => (
  <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
);

/**
 * @IS_LOGGED_IN is a query
 */
export default graphql(IS_LOGGED_IN)(AppContainer);
