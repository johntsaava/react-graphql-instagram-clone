import React from "react";
import styled from "styled-components";

import * as Icons from "../Icons";

const StyledLogo = styled(Icons.Logo)`
  margin: auto;
  height: 50px;
  fill: #bbb;
`;

const Loading = () => {
  return <StyledLogo />;
};

export default Loading;
