import React from "react";
import styled from "styled-components";
import Moment from "react-moment";

const StyledDate = styled.span`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 500;
`;

const Date = ({ date }) => (
  <StyledDate>
    <Moment format="DD MMMM YYYY HH:mm">{date}</Moment>
  </StyledDate>
);

export default Date;
