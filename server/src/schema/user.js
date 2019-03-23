import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID, username: String): User
    me: User
  }

  extend type Mutation {
    signUp(input: SignUpInput!): User
    signIn(login: String!, password: String!): User
    deleteUser(id: ID!): Boolean!
    confirmUser(token: String!): Boolean!
    forgotPassword(login: String!): Boolean!
    changePassword(input: ChangePasswordInput!): User
    logout: Boolean!
    editAccount(input: EditAccountInput): User
  }

  input SignUpInput {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
  }

  input EditAccountInput {
    firstName: String
    lastName: String
    username: String
    email: String
    picture: PictureUpload
  }

  input ChangePasswordInput {
    token: String!
    password: String!
  }

  type User {
    id: ID!
    fullName: String!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    profilePictureUrl: String
    posts(cursor: String, limit: Int): PostConnection!
  }
`;
