import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`;

const Close = ({ dispatch }) => (
  <StyledButton
    onClick={() => {
      dispatch({ type: "RESET_POST" });
    }}
  >
    Close
  </StyledButton>
);

export default Close;
