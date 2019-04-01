import React, { useReducer } from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { useQuery } from "react-apollo-hooks";

import context from "../context";
import reducer from "../reducer";

import me from "../graphql/user/queries/me";
import Nav from "./Nav";
import Home from "./pages/Home";
import ConfirmUser from "./pages/ConfirmUser";
import CheckEmail from "./pages/CheckEmail";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import NotFound from "./pages/NotFound";
import User from "./pages/User";
import CreatePostPage from "./pages/CreatePostPage";
import Loading from "./Loading";
import PostDetails from "./PostDetails";
import Backdrop from "./Backdrop";
import EditAccount from "./pages/EditAccount";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');
  body {
    font-family: 'Roboto', sans-serif;
    background-color: #fafafa;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 77px;
`;

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    postId: null
  });

  const { data, error, loading } = useQuery(me);
  if (loading)
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  if (error) return <div>Error! {error.message}</div>;
  if (!state.user && data.me) dispatch({ type: "INIT_USER", payload: data.me });

  return (
    <context.Provider
      value={{
        state,
        dispatch
      }}
    >
      <Router>
        <Wrapper>
          <GlobalStyle />
          <Nav />
          {state.postId && (
            <>
              <Backdrop />
              <PostDetails />
            </>
          )}
          <Switch>
            {!state.user && <Redirect from="/create-post" to="/sign-in" />}
            {!state.user && <Redirect from="/edit-account" to="/sign-in" />}
            {state.user && <Redirect from="/sign-in" to="/" />}
            {state.user && <Redirect from="/sign-up" to="/" />}

            <Route exact path="/" component={Home} />
            <Route path="/user/:username" component={User} />
            <Route path="/edit-account" component={EditAccount} />
            <Route path="/create-post" component={CreatePostPage} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/confirm-user/:token" component={ConfirmUser} />
            <Route path="/check-email" component={CheckEmail} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/change-password/:token" component={ChangePassword} />
            <Route component={NotFound} />
          </Switch>
        </Wrapper>
      </Router>
    </context.Provider>
  );
};

export default App;
