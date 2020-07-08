import ApolloClient, { Operation } from "apollo-boost";

/**
 * apollo configuration object
 * let request object access to all operations
 */
const client = new ApolloClient({
  // set state
  clientState: {
    defaults: {
      // default values
      auth: {
        __typename: "Auth",
        isLoggedIn: Boolean(localStorage.getItem("jwt")),
      },
    },

    // do something with state
    resolvers: {
      Mutation: {
        // user login
        logUserIn: (_, { token }, { cache }) => {
          localStorage.setItem("jwt", token);
          cache.writeData({
            data: {
              auth: {
                __typename: "Auth",
                isLoggedIn: true,
              },
            },
          });

          return null;
        },

        // user logout
        logUserOut: (_, __, { cache }) => {
          localStorage.removeItem("jwt");
          cache.writeData({
            data: {
              __typename: "Auth",
              isLoggedIn: false,
            },
          });

          return null;
        },
      },
    },
  },

  /**
   * @Operation we have access to operation object
   * so we can intercept when someone sends mutation or query
   * this is top level configuration
   */
  request: async (operation: Operation) => {
    /**
     * if we set context in apollo,
     * we dont have to call local storage for every fetch for jwt,
     * in apollo, we request and set context, it all happens in request
     */
    operation.setContext({
      // set headers
      headers: { "X-JWT": localStorage.getItem("jwt") || "" },
    });
  },

  // graphql endpoint
  uri: "https://localhost:4000/graphql",
});

export default client;
