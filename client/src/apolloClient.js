import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";

const link = new createUploadLink({
  uri: "http://localhost:8000/graphql",
  credentials: "include"
});

const cache = new InMemoryCache();

export default new ApolloClient({
  link,
  cache
});
