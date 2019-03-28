import React, { useContext } from "react";
import styled from "styled-components";

import context from "../../context";

import * as Icons from "../../Icons";

const InfoWrapper = styled.div`
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

const Info = styled.span`
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 500;
`;

const InfoNum = styled.span`
  margin-left: 5px;
`;

const StyledPost = styled.div`
  position: relative;
  margin: 10px;
  background: url(${props => props.url}) no-repeat center;
  background-size: cover;
  background-color: #fff;
  &:hover {
    ${InfoWrapper} {
      display: flex;
    }
  }
  &:after {
    content: "";
    display: block;
    padding-top: 100%;
  }

  @media (max-width: 550px) {
    margin: 5px;
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
      <InfoWrapper>
        <Info>
          <Icons.Like fill="#fff" height="22px" />
          <InfoNum>{post.likes.length}</InfoNum>
        </Info>
        <Info>
          <Icons.Comment fill="#fff" height="22px" />
          <InfoNum>{post.comments.length}</InfoNum>
        </Info>
      </InfoWrapper>
    </StyledPost>
  );
};

export default Post;
