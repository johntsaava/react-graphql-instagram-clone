import styled from "styled-components";

import { Link } from "react-router-dom";

export default styled(Link)`
  color: #3897f0;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  &:hover,
  &:active {
    opacity: 0.5;
  }
`;
