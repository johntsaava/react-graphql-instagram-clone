import gql from "graphql-tag";

export default gql`
  query Post($id: ID!) {
    post(id: $id) {
      id
      caption
      likes
      pictureUrl
      createdAt
      viewerHasStarred
      comments {
        id
        text
        author {
          id
          username
        }
      }
      author {
        id
        profilePictureUrl
        username
      }
    }
  }
`;
