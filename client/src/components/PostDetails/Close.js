import React from "react";
import styled from "styled-components";

import * as Icons from "../../Icons";

const StyledButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  cursor: pointer;
`;

const CloseIcon = styled(Icons.Close)`
  height: 18px;
  fill: #262626;
`;

const Close = ({ dispatch }) => (
  <StyledButton
    onClick={() => {
      dispatch({ type: "RESET_POST" });
    }}
  >
    <CloseIcon />
  </StyledButton>
);

export default Close;
