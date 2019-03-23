import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import * as Icons from "../../Icons";

const StyledLogo = styled(Icons.Logo)`
  height: 30px;
  fill: #262626;
`;

const NavLogo = () => {
  return (
    <Link to="/">
      <StyledLogo />
    </Link>
  );
};

export default NavLogo;
