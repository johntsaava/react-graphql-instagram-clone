import gql from "graphql-tag";

export default gql`
  mutation EditAccount($input: EditAccountInput!) {
    editAccount(input: $input) {
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
