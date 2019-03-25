import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    posts(cursor: String, limit: Int): PostConnection!
    post(id: ID!): Post
  }

  extend type Mutation {
    createPost(pictureUrl: String!, caption: String!): Post
    likePost(id: ID!): Boolean!
    unlikePost(id: ID!): Boolean!
  }

  type PostConnection {
    edges: [Post!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    totalCount: Int!
    endCursor: String!
  }

  type Post {
    id: ID!
    author: User!
    likes: [ID!]!
    caption: String
    pictureUrl: String!
    comments: [Comment!]!
    createdAt: Date!
    viewerHasStarred: Boolean!
  }
`;
