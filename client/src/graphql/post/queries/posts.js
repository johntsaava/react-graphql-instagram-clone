import gql from "graphql-tag";

import POST_FRAGMENT from "../../fragments/post";

export default gql`
  {
    posts {
      edges {
        ...PostFields
      }
      pageInfo {
        totalCount
      }
    }
  }
  ${POST_FRAGMENT}
`;
