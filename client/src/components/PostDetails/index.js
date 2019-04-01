import React, { useContext, useState } from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import { withRouter } from "react-router-dom";

import GET_POST from "../../graphql/post/queries/post";
import ADD_COMMENT from "../../graphql/post/mutations/createComment";
import LIKE_POST from "../../graphql/post/mutations/likePost";
import UNLIKE_POST from "../../graphql/post/mutations/unlikePost";

import userAvatar from "../../user.jpg";
import Loading from "../Loading";
import context from "../../context";
import Date from "./Date";

import Wrapper from "./styled/Wrapper";
import Section from "./styled/Section";
import Header from "./styled/Header";
import AuthorPicture from "./styled/AuthorPicture";
import Username from "./styled/Username";
import Comment from "./styled/Comment";
import Actions from "./styled/Actions";
import Action from "./styled/Action";
import Comments from "./styled/Comments";
import CommentTextarea from "./styled/CommentTextarea";
import Picture from "./styled/Picture";
import Likes from "./styled/Likes";
import LikeIcon from "./styled/icons/LikeIcon";
import CommentIcon from "./styled/icons/CommentIcon";
import Close from "./Close";

const PostDetails = ({ history }) => {
  const { state, dispatch } = useContext(context);
  const createComment = useMutation(ADD_COMMENT, {
    update: (proxy, { data: { createComment } }) => {
      try {
        const dataQuery = proxy.readQuery({
          query: GET_POST,
          variables: { id: state.postId }
        });

        dataQuery.post.comments.push({
          author: {
            id: createComment.author.id,
            username: createComment.author.username,
            __typename: "User"
          },
          id: createComment.id,
          text: createComment.text,
          __typename: "Comment"
        });

        proxy.writeQuery({
          query: GET_POST,
          variables: { id: state.postId },
          data: dataQuery
        });
      } catch (error) {
        console.error(error);
      }
    }
  });
  const likePost = useMutation(LIKE_POST, {
    update: proxy => {
      try {
        const dataQuery = proxy.readQuery({
          query: GET_POST,
          variables: { id: state.postId }
        });

        dataQuery.post.likes.push(state.user.id);
        dataQuery.post.viewerHasStarred = true;

        proxy.writeQuery({
          query: GET_POST,
          variables: { id: state.postId },
          data: dataQuery
        });
      } catch (error) {
        console.error(error);
      }
    }
  });
  const unlikePost = useMutation(UNLIKE_POST, {
    update: proxy => {
      try {
        const dataQuery = proxy.readQuery({
          query: GET_POST,
          variables: { id: state.postId }
        });

        dataQuery.post.likes = dataQuery.post.likes.filter(
          userId => userId !== state.user.id
        );

        dataQuery.post.viewerHasStarred = false;
        proxy.writeQuery({
          query: GET_POST,
          variables: { id: state.postId },
          data: dataQuery
        });
      } catch (error) {
        console.error(error);
      }
    }
  });
  const [text, setText] = useState("");
  const {
    data: { post },
    error,
    loading
  } = useQuery(GET_POST, {
    variables: { id: state.postId }
  });
  if (loading) return <Loading />;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <Wrapper>
      <Close dispatch={dispatch} />
      <Picture src={post.pictureUrl} alt={post.caption} />

      <Section>
        <Header>
          <AuthorPicture
            url={post.author.profilePictureUrl || userAvatar}
            onClick={() => {
              history.push(`/user/${post.author.username}`);
            }}
          />
          <Username to={`/user/${post.author.username}`}>
            {post.author.username}
          </Username>
        </Header>

        <Comments>
          <Comment>
            <Username to={`/user/${post.author.username}`}>
              {post.author.username}
            </Username>{" "}
            {post.caption}
          </Comment>

          {post.comments.map(comment => (
            <Comment key={comment.id}>
              <Username to={`/user/${post.author.username}`}>
                {comment.author.username}
              </Username>{" "}
              {comment.text}
            </Comment>
          ))}
        </Comments>

        <Actions>
          <Action>
            <LikeIcon
              active={post.viewerHasStarred ? 1 : 0}
              onClick={() => {
                if (state.user) {
                  if (post.viewerHasStarred)
                    unlikePost({
                      variables: {
                        id: post.id
                      }
                    });
                  else
                    likePost({
                      variables: {
                        id: post.id
                      }
                    });
                } else {
                  history.push("/sign-in");
                  dispatch({ type: "RESET_POST" });
                }
              }}
            />
          </Action>
          <Action>
            <CommentIcon
              onClick={() => {
                if (state.user) {
                  if (text.length > 0)
                    createComment({
                      variables: { postId: post.id, text }
                    });
                } else {
                  history.push("/sign-in");
                  dispatch({ type: "RESET_POST" });
                }
              }}
            />
          </Action>
        </Actions>

        <Likes>Likes {post.likes.length}</Likes>
        <Date date={post.createdAt} />

        <CommentTextarea
          onChange={e => {
            setText(e.target.value);
          }}
          type="text"
          placeholder="Add comment..."
          rows="1"
          value={text}
        />
      </Section>
    </Wrapper>
  );
};

export default withRouter(PostDetails);
