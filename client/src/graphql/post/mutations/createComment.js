import gql from "graphql-tag";

export default gql`
  mutation CreateComment($postId: ID!, $text: String!) {
    createComment(postId: $postId, text: $text) {
      createdAt
      text
      id
      post {
        pictureUrl
      }
      author {
        id
        username
      }
    }
  }
`;
