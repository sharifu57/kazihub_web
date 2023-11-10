import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
    uri : "http://localhost:8007/graphql/",
    cache: new InMemoryCache(),
})