import gql from "graphql-tag";

export default gql`
  mutation SignIn($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
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
