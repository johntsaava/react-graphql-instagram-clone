import gql from "graphql-tag";

export default gql`
  query Me {
    me {
      id
      profilePictureUrl
      firstName
      lastName
      username
      email
    }
  }
`;
