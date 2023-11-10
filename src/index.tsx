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
import { GoogleOAuthProvider } from "@react-oauth/google";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

const client = new ApolloClient({
  uri: "http://localhost:8007/graphql/",
  cache: new InMemoryCache()
});

root.render(
  <GoogleOAuthProvider clientId="140823071607-kkj6bttfl1jrshmtojk1ceeasmnvrkof.apps.googleusercontent.com">
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
