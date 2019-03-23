import gql from "graphql-tag";

export default gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
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
