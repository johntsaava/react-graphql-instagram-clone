import React, { useContext, useEffect } from "react";
import { useQuery } from "react-apollo-hooks";

import GET_USER from "../../graphql/user/queries/user";
import context from "../../context";

import Profile from "../Profile";
import Header from "../Posts/Header";
import Posts from "../Posts";
import Loading from "../Loading";
import Container from "../styled/Container";
import PostsContainer from "../styled/PostsContainer";

const User = ({ match, history }) => {
  const { dispatch } = useContext(context);
  useEffect(() => {
    dispatch({ type: "RESET_POST" });
  }, []);

  const { data, error, loading } = useQuery(GET_USER, {
    variables: { username: match.params.username }
  });
  if (loading) return <Loading />;
  if (error) {
    console.log(Object.keys(error), error["graphQLErrors"]);
    return <div>Error! {error.message}</div>;
  }

  if (!data.user) {
    history.push("/404");
    return null;
  }
  return (
    <>
      <Container>
        <Profile user={data.user} />
        <Header />
      </Container>
      <PostsContainer>
        <Posts posts={data.user.posts.edges} />
      </PostsContainer>
    </>
  );
};

export default User;
