import React from "react";
import styled from "styled-components";

const StyledDivider = styled.div`
  color: #999;
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  margin: 18px 0;
  width: 100%;
  text-align: center;
  position: relative;
  ::before {
    content: "";
    position: absolute;
    top: 7px;
    left: 0;
    right: calc(50% + 26px);
    height: 1px;
    background-color: #efefef;
  }
  ::after {
    content: "";
    position: absolute;
    top: 7px;
    right: 0;
    left: calc(50% + 26px);
    height: 1px;
    background-color: #efefef;
  }
`;

const Divider = ({ children }) => {
  return <StyledDivider>{children}</StyledDivider>;
};

export default Divider;
