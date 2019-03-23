import gql from "graphql-tag";

export default gql`
  fragment PostFields on Post {
    id
    caption
    pictureUrl
    likes
    comments {
      id
    }
  }
`;
