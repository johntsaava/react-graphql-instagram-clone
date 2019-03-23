import React, { useContext } from "react";
import styled from "styled-components";

import context from "../context";

const StyledBackdrop = styled.div`
  content: "";
  z-index: 1;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Backdrop = () => {
  const { dispatch } = useContext(context);

  return (
    <StyledBackdrop
      onClick={() => {
        dispatch({ type: "RESET_POST" });
      }}
    />
  );
};

export default Backdrop;
