import React, { useContext } from "react";

import context from "../../context";

import StyledNav from "./styled/StyledNav";
import Container from "./styled/Container";
import Search from "./styled/Search";
import LinksWrapper from "./styled/LinksWrapper";
import LoggedInLinks from "./LoggedInLinks";
import LoggedOutLinks from "./LoggedOutLinks";
import NavLogo from "./NavLogo";

const Nav = () => {
  const { state } = useContext(context);
  return (
    <StyledNav>
      <Container>
        <NavLogo />
        {/* <Search type="text" placeholder="Search" /> */}
        <LinksWrapper>
          {state.user ? (
            <LoggedInLinks user={state.user} />
          ) : (
            <LoggedOutLinks />
          )}
        </LinksWrapper>
      </Container>
    </StyledNav>
  );
};

export default Nav;
