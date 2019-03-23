import gql from "graphql-tag";

export default gql`
  mutation UnlikePost($id: ID!) {
    unlikePost(id: $id)
  }
`;
