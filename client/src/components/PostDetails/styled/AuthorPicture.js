import styled from "styled-components";

export default styled.div`
  height: 30px;
  width: 30px;
  background: url(${props => props.url}) no-repeat center;
  background-size: cover;
  border-radius: 50%;
  margin-right: 12px;
  cursor: pointer;
`;
