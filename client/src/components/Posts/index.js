import React from "react";

import StyledPosts from "./styled/StyledPosts";
import Post from "./Post";

const Posts = ({ posts }) => (
  <StyledPosts>
    {posts.map(post => (
      <Post post={post} key={post.id} />
    ))}
  </StyledPosts>
);

export default Posts;
