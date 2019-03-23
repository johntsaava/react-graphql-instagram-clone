import React from "react";
import styled from "styled-components";

const Info = styled.p`
  margin: auto;
  padding: 40px;
  border: 1px solid #e6e6e6;
  border-radius: 1px;
  background-color: #fff;
`;

const CheckEmail = () => {
  return <Info>Check your email to confirm your account</Info>;
};

export default CheckEmail;
