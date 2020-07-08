import React from "react";
import { graphql } from "react-apollo";
import { IS_LOGGED_IN } from "./AppQueries";
import AppPresenter from "./AppPresenter";
import theme from "../../theme";
import { ThemeProvider } from "../../typed-components";


const AppContainer: any = ({ data }) => (
  <ThemeProvider theme={theme}>
    <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
  </ThemeProvider>
);

/**
 * @IS_LOGGED_IN is a query
 */
export default graphql(IS_LOGGED_IN)(AppContainer);
