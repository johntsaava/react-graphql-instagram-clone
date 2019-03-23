import React from "react";
import styled from "styled-components";
import StyledLink from "../styled/StyledLink";

const Wrapper = styled.div`
  margin: 100px auto 0;
  text-align: center;
  h2 {
    margin-bottom: 15px;
  }
`;

const NotFound = () => {
  return (
    <Wrapper>
      <h2>Sorry, this page isn't available.</h2>
      <p>
        The link you followed may be broken, or the page may have been removed.
        <StyledLink to="/"> Go back to Instagram.</StyledLink>
      </p>
    </Wrapper>
  );
};

export default NotFound;
