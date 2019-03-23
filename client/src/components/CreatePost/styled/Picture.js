import styled from "styled-components";

export default styled.div`
  height: 48px;
  min-height: 48px;
  width: 48px;
  min-width: 48px;
  ${props =>
    props.url &&
    `background: url(${props.url}) no-repeat center; background-size: cover;`}
`;
