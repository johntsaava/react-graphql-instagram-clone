import React from "react";
import styled from "styled-components";

import * as Icons from "../Icons";

const StyledLoading = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  z-index: 2;
`;

const StyledLogo = styled(Icons.Logo)`
  margin: auto;
  height: 50px;
  fill: #bbb;
`;

const Loading = () => {
  return (
    <StyledLoading>
      <StyledLogo />
    </StyledLoading>
  );
};

export default Loading;
