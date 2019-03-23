import styled from "styled-components";

import { Link } from "react-router-dom";

export default styled(Link)`
  color: #fff;
  text-decoration: none;
  display: inline-block;
  background-color: #3897f0;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  font-weight: 500;
  &:focus,
  &:active {
    opacity: 0.7;
  }
`;
