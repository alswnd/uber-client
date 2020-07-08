import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";

/**
 * @ApolloProvider connect apollo to react
 * apollo also used with vue, angular
 */
import { ApolloProvider } from "react-apollo";
import client from "./apollo";
import GlobalStyle from "./global-styles";

ReactDOM.render(
  <ApolloProvider client={client}>
    <GlobalStyle />
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
