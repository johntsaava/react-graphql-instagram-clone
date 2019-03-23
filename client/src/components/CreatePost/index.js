import React, { useState, useContext } from "react";
import { useMutation } from "react-apollo-hooks";

import CREATE_POST from "../../graphql/post/mutations/createPost";
import GET_POSTS from "../../graphql/post/queries/posts";
import GET_USER from "../../graphql/user/queries/user";
import context from "../../context";

import Textarea from "../styled/Textarea";
import Form from "./styled/Form";
import Header from "./styled/Header";
import Title from "./styled/Title";
import Button from "./styled/Button";
import Main from "./styled/Main";
import Picture from "./styled/Picture";

const CreatePost = ({ picture, pictureUrl, history }) => {
  const [caption, useCaption] = useState("");
  const { state } = useContext(context);
  const mutate = useMutation(CREATE_POST, {
    variables: {
      caption,
      picture
    }
  });

  return (
    <Form
      onSubmit={async e => {
        e.preventDefault();
        await mutate({
          refetchQueries: [
            {
              query: GET_POSTS
            },
            {
              query: GET_USER,
              variables: { username: state.user.username }
            }
          ]
        });
        history.push(`/user/${state.user.username}`);
      }}
    >
      <Header>
        <Title>New Post</Title>
        <Button>Share</Button>
      </Header>

      <Main>
        <Textarea
          onChange={e => {
            useCaption(e.target.value);
          }}
          value={caption}
          type="text"
          placeholder="Write a caption..."
          rows="3"
        />
        <Picture url={pictureUrl} />
      </Main>
    </Form>
  );
};

export default CreatePost;
