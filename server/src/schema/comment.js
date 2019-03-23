import { gql } from "apollo-server-express";

export default gql`
  extend type Mutation {
    createComment(postId: ID!, text: String!): Comment
  }

  type Comment {
    id: ID!
    author: User!
    post: Post!
    text: String
    createdAt: Date!
  }
`;
