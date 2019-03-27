import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";

import GET_USER from "../../graphql/user/queries/user";
import Profile from "../Profile";
import Header from "../Posts/Header";
import Posts from "../Posts";
import Loading from "../Loading";
import context from "../../context";

const Container = styled.div`
  width: 100%;
  max-width: 1010px;
  margin: 0 auto;
  padding: 60px 20px 0;
`;

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
    <Container>
      <Profile user={data.user} />
      <Header />
      <Posts posts={data.user.posts.edges} />
    </Container>
  );
};

export default User;
