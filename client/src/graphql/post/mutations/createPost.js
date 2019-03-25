import gql from "graphql-tag";

export default gql`
  mutation CreatePost($pictureUrl: String!, $caption: String!) {
    createPost(pictureUrl: $pictureUrl, caption: $caption) {
      id
      caption
      pictureUrl
    }
  }
`;
