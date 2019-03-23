import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";

import Loading from "../Loading";

const DeleteUser = ({ history }) => {
  const { data, error, loading } = useQuery(gql`
    {
      user(id: "5c863f8bea574e3ad44f325a") {
        id
        fullName
      }
    }
  `);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    if (error.message.includes("Not authenticated as user"))
      history.push("/sign-in");
    return <div>Error! {error.message}</div>;
  }

  return <p>{data}</p>;
};

export default DeleteUser;
