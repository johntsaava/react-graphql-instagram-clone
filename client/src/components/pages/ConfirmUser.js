import React from "react";
import styled from "styled-components";
import { useMutation } from "react-apollo-hooks";

import confirmUser from "../../graphql/user/mutations/confirmUser";

const StyledButton = styled.button`
  background-color: #3897f0;
  border: none;
  outline: none;
  width: 100%;
  color: #fff;
  cursor: pointer;
  padding: 9px 0;
  border-radius: 4px;
  margin-top: 10px;
  font-size: 14px;
  &:focus,
  &:active {
    opacity: 0.7;
  }
`;

const Wrapper = styled.div`
  margin: auto;
  padding: 40px;
  width: 100%;
  max-width: 350px;
  border: 1px solid #e6e6e6;
  border-radius: 1px;
  background-color: #fff;
`;

const ConfirmUser = props => {
  const confirm = useMutation(confirmUser, {
    variables: {
      token: props.match.params.token
    }
  });

  return (
    <Wrapper>
      <StyledButton
        onClick={async () => {
          await confirm();
          props.history.push("/");
        }}
      >
        Confirm
      </StyledButton>
    </Wrapper>
  );
};

export default ConfirmUser;
