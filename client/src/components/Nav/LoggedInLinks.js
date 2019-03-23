import React from "react";
import { Link } from "react-router-dom";

import Logout from "../Logout";
import * as Icons from "../../Icons";

const LoggedInLinks = ({ user }) => {
  return (
    <>
      <Link to={`/user/${user.username}`}>
        <Icons.User height="24px" />
      </Link>
      <Link to="/create-post">
        <Icons.Create height="24px" />
      </Link>
      <Logout />
    </>
  );
};

export default LoggedInLinks;
