import styled from "styled-components";

export default styled.footer`
  display: flex;
  flex-shrink: 0;
  & > svg {
    height: 24px;
    cursor: pointer;
  }

  & > svg:first-child {
    margin-right: 15px;
  }
`;
