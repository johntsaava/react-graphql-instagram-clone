import React, { useContext } from "react";
import styled from "styled-components";

import context from "../context";
import ButtonLink from "./styled/ButtonLink";

const StyledProfile = styled.div`
  display: flex;
`;

const Picture = styled.div`
  height: 150px;
  min-height: 150px;
  width: 150px;
  min-width: 150px;
  border-radius: 50%;
  background: url(${props => props.src}) no-repeat;
  background-size: cover;
  margin: 0 40px;
`;

const Info = styled.div`
  margin-left: 30px;
`;

const Username = styled.h1`
  color: #262626;
  font-size: 28px;
  line-height: 32px;
  text-overflow: ellipsis;
  font-weight: 300;
  margin-right: 20px;
`;
const InfoHeader = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const InfoMain = styled.header`
  font-size: 16px;
  line-height: 24px;
  word-wrap: break-word;
`;

const StyledUserFullname = styled.h1`
  font-weight: 500;
  font-size: inherit;
`;
const PostsInfo = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Item = styled.span`
  font-size: 16px;
  margin-right: 40px;
  color: inherit;
  font-weight: 300;
`;

const Count = styled.span`
  font-weight: 500;
`;

const Profile = ({ user }) => {
  const { state } = useContext(context);
  return (
    <StyledProfile>
      <Picture
        src={
          user.profilePictureUrl ||
          "https://instagram.fcgk9-1.fna.fbcdn.net/vp/67246cd919422b22ddc6e1f048b8478d/5D0566F1/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fcgk9-1.fna.fbcdn.net&_nc_cat=1"
        }
      />
      <Info>
        <InfoHeader>
          <Username>{user.username}</Username>
          {state.user && user.username === state.user.username && (
            <ButtonLink to="/edit-account">Edit profile</ButtonLink>
          )}
        </InfoHeader>
        <PostsInfo>
          <Item>
            <Count>{user.posts.pageInfo.totalCount}</Count> posts
          </Item>
        </PostsInfo>
        <InfoMain>
          <StyledUserFullname>{user.fullName}</StyledUserFullname>
        </InfoMain>
      </Info>
    </StyledProfile>
  );
};

export default Profile;
