import gql from "graphql-tag";

export default gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      id
      profilePictureUrl
      fullName
      firstName
      lastName
      username
      email
    }
  }
`;
