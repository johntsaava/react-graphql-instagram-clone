import React from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  font-size: 12px;
  position: absolute;
  left: 10px;
  color: #999;
  line-height: 36px;
  pointer-events: none;
  transform-origin: left;
  transition: transform 100ms ease-in-out;
  ${props => props.active && "transform: scale(0.83333) translateY(-10px);"}
`;

const StyledInput = styled.input`
  font-size: 12px;
  height: 36px;
  width: 100%;
  padding: 0 10px;
  margin-bottom: 6px;
  border-radius: 3px;
  border: 1px solid #efefef;
  background-color: #fafafa;
  color: #262626;
  outline: none;
  ${props => props.active && "padding-top: 15px;"}

  &:focus {
    border-color: #b2b2b2;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  &:focus-within {
    ${StyledLabel} {
      transform: scale(0.83333) translateY(-10px);
    }
    ${StyledInput} {
      padding-top: 15px;
    }
  }
`;
const StyledError = styled.span`
  position: absolute;
  right: 10px;
  font-size: 12px;
  color: #e64855;
  line-height: 36px;
`;

const InputField = ({ field, form: { errors, touched }, label, ...props }) => {
  const error = touched[field.name] && errors[field.name];
  const active = !!field.value;
  return (
    <InputWrapper>
      <StyledLabel active={active}>{label}</StyledLabel>
      {error && <StyledError>{error}</StyledError>}
      <StyledInput active={active} error={error} {...field} {...props} />
    </InputWrapper>
  );
};

export default InputField;
