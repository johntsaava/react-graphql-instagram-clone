import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";

import GET_POSTS from "../../graphql/post/queries/posts";
import Posts from "../Posts";
import Loading from "../Loading";

const StyledContainer = styled.div`
  width: 100%;
  max-width: 1010px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Home = () => {
  const { data, error, loading } = useQuery(GET_POSTS);
  if (loading) return <Loading />;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <StyledContainer>
      <Posts posts={data.posts.edges} />
    </StyledContainer>
  );
};

export default Home;
