import styled from "styled-components";

export default styled.input`
  width: 215px;
  background: #fafafa;
  border: solid 1px #dbdbdb;
  border-radius: 3px;
  color: #999;
  font-size: 14px;
  font-weight: 300;
  font-family: inherit;
  padding: 3px 26px;
  outline: none;
  text-align: center;
  &:focus {
    color: #262626
    text-align: left;
    background: #fff;
  }
  ::placeholder {
    color: #999;
  }
`;
