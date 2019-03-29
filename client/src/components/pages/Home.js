import React from "react";
import { useQuery } from "react-apollo-hooks";

import GET_POSTS from "../../graphql/post/queries/posts";
import Posts from "../Posts";
import Loading from "../Loading";
import PostsContainer from "../styled/PostsContainer";

const Home = () => {
  const { data, error, loading } = useQuery(GET_POSTS);
  if (loading) return <Loading />;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <PostsContainer>
      <Posts posts={data.posts.edges} />
    </PostsContainer>
  );
};

export default Home;
