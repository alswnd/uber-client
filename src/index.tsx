import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

/**
 * @ApolloProvider connect apollo to react
 * apollo also used with vue, angular
 */
import { ApolloProvider } from "react-apollo";
import client from "./apollo";

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
