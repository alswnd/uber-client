import React from "react";
import { graphql } from "react-apollo";
import { IS_LOGGED_IN } from "./AppQueries";

const AppContainer: any = ({ data }) => <div>{JSON.stringify(data)}</div>;

/**
 * @IS_LOGGED_IN is a query
 */
export default graphql(IS_LOGGED_IN)(AppContainer);
