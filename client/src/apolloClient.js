import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

const link = new HttpLink({
  uri: "https://react-instagram-clone-server.herokuapp.com/graphql",
  credentials: "include"
});

const cache = new InMemoryCache();

export default new ApolloClient({
  link,
  cache
});
