import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./i18n";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql
} from "@apollo/client";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

const client = new ApolloClient({
  uri: "http://localhost:8007/graphql/",
  cache: new InMemoryCache()
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
