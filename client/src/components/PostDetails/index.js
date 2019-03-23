import React, { useContext, useState } from "react";
import { useQuery, useMutation } from "react-apollo-hooks";

import GET_POST from "../../graphql/post/queries/post";
import ADD_COMMENT from "../../graphql/post/mutations/createComment";
import LIKE_POST from "../../graphql/post/mutations/likePost";
import UNLIKE_POST from "../../graphql/post/mutations/unlikePost";

import Loading from "../Loading";
import context from "../../context";
import Date from "./Date";

import * as Icons from "../../Icons";
import Wrapper from "./styled/Wrapper";
import Section from "./styled/Section";
import Header from "./styled/Header";
import AuthorPicture from "./styled/AuthorPicture";
import Username from "./styled/Username";
import Comment from "./styled/Comment";
import Actions from "./styled/Actions";
import Comments from "./styled/Comments";
import CommentTextarea from "./styled/CommentTextarea";
import Picture from "./styled/Picture";
import Likes from "./styled/Likes";

const PostDetails = () => {
  const { state } = useContext(context);
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
  const [text, useText] = useState("");
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
      <Picture src={post.pictureUrl} alt={post.caption} />

      <Section>
        <Header>
          <AuthorPicture
            src="https://instagram.fcgk9-1.fna.fbcdn.net/vp/67246cd919422b22ddc6e1f048b8478d/5D0566F1/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fcgk9-1.fna.fbcdn.net&_nc_cat=1"
            alt={post.caption}
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
          <Icons.Like
            fill={post.viewerHasStarred ? "#e64855" : "none"}
            stroke={post.viewerHasStarred ? "#e64855" : "#262626"}
            onClick={() => {
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
            }}
          />
          <Icons.Comment
            fill="none"
            stroke="#262626"
            onClick={() => {
              createComment({
                variables: { postId: post.id, text }
              });
            }}
          />
        </Actions>

        <Likes>Likes {post.likes.length}</Likes>
        <Date date={post.createdAt} />

        <CommentTextarea
          onChange={e => {
            useText(e.target.value);
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

export default PostDetails;
