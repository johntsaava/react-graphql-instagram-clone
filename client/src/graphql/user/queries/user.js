import gql from "graphql-tag";

import POST_FRAGMENT from "../../fragments/post";

export default gql`
  query User($username: String!) {
    user(username: $username) {
      id
      profilePictureUrl
      fullName
      username
      posts {
        edges {
          ...PostFields
        }
        pageInfo {
          totalCount
        }
      }
    }
  }
  ${POST_FRAGMENT}
`;
