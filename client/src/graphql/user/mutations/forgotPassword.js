import gql from "graphql-tag";

export default gql`
  mutation ForgotPassword($login: String!) {
    forgotPassword(login: $login)
  }
`;
