import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { useApolloClient, useMutation } from "react-apollo-hooks";

import context from "../context";
import logout from "../graphql/user/mutations/logout";
import StyledButton from "./styled/StyledButton";

const Logout = withRouter(({ history }) => {
  const { dispatch } = useContext(context);
  const mutate = useMutation(logout);
  const client = useApolloClient();

  return (
    <StyledButton
      onClick={async () => {
        await mutate();
        await client.resetStore();
        dispatch({ type: "RESET_USER" });
        history.push("/sign-in");
      }}
    >
      Logout
    </StyledButton>
  );
});

export default Logout;
