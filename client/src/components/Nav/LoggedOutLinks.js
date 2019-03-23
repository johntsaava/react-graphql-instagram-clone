import React from "react";

import StyledLink from "../styled/StyledLink";
import ButtonLink from "../styled/ButtonLink";

const LoggedOutLinks = () => {
  return (
    <>
      <ButtonLink to="/sign-in">Log In</ButtonLink>
      <StyledLink to="/sign-up">Sign Up</StyledLink>
    </>
  );
};

export default LoggedOutLinks;
