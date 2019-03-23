import gql from "graphql-tag";

export default gql`
  mutation CreatePost($picture: PictureUpload!, $caption: String!) {
    createPost(picture: $picture, caption: $caption) {
      id
      caption
      pictureUrl
    }
  }
`;
