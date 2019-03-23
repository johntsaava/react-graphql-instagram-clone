import React, { useContext } from "react";
import styled from "styled-components";

import context from "../../context";

import * as Icons from "../../Icons";

const Info = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  & > :first-child {
    margin-right: 25px;
  }
`;

const InfoEl = styled.span`
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 500;
`;

const StyledPost = styled.div`
  background: url(${props => props.url}) no-repeat center;
  background-size: cover;
  background-color: #fff;
  width: 94%;
  position: relative;
  &:hover {
    ${Info} {
      display: flex;
    }
  }
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const Post = ({ post }) => {
  const { dispatch } = useContext(context);

  return (
    <StyledPost
      url={post.pictureUrl}
      onClick={() => {
        dispatch({ type: "SET_POST", payload: post.id });
      }}
    >
      <Info>
        <InfoEl>
          <Icons.Like fill="#fff" height="22px" />
          {post.likes.length}
        </InfoEl>
        <InfoEl>
          <Icons.Comment fill="#fff" height="22px" />
          {post.comments.length}
        </InfoEl>
      </Info>
    </StyledPost>
  );
};

export default Post;
