import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { config } from "./config";
import "./index.css";
import App from "./App";

// Create the client with the needed configuration
const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
  // to a different host
  link: new HttpLink({
    // Define your backend (our github api) with the corresponding key
    uri: "https://api.github.com/graphql",
    headers: {
      authorization: `Bearer ${config.githubToken}`
    }
  }),
  cache: new InMemoryCache({
    dataIdFromObject: o => o.id
  })
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
