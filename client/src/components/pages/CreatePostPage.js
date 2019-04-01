import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import PictureUpload from "../PictureUpload";
import CreatePost from "../CreatePost";

const StyledPictureUpload = styled(PictureUpload)`
  margin: auto;
`;

const CreatePostPage = ({ history, me }) => {
  const [picture, setPicture] = useState(null);

  return picture ? (
    <CreatePost me={me} picture={picture} history={history} />
  ) : (
    <StyledPictureUpload setPicture={setPicture} />
  );
};

export default withRouter(CreatePostPage);
