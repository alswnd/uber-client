import React from "react";
import { graphql } from "react-apollo";
import { IS_LOGGED_IN } from "./AppQueries.local";
import AppPresenter from "./AppPresenter";
import theme from "../../theme";
import { ThemeProvider } from "../../typed-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const AppContainer: any = ({ data }) => (
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
    </ThemeProvider>
    <ToastContainer draggable={true} position={"bottom-center"} />
  </React.Fragment>
);

/**
 * @IS_LOGGED_IN is a query
 */
export default graphql(IS_LOGGED_IN)(AppContainer);
