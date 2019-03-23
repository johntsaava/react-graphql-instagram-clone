import gql from "graphql-tag";

export default gql`
  mutation LikePost($id: ID!) {
    likePost(id: $id)
  }
`;
