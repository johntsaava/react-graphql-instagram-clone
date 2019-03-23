import React from "react";
import { Formik, Field } from "formik";
import { useMutation } from "react-apollo-hooks";

import InputField from "../fields/InputField";
import forgotPassword from "../../graphql/user/mutations/forgotPassword";
import Divider from "../Divider";

import StyledForm from "../styled/StyledForm";
import StyledFormLogo from "../styled/StyledFormLogo";
import StyledFormButton from "../styled/StyledFormButton";
import StyledLink from "../styled/StyledLink";
import StyledFormFooter from "../styled/StyledFormFooter";
import StyledFormWrapper from "../styled/StyledFormWrapper";

const ForgotPassword = ({ history }) => {
  const forgot = useMutation(forgotPassword);

  return (
    <Formik
      onSubmit={async input => {
        const response = await forgot({
          variables: input
        });
        console.log(response);
        history.push("/check-email");
      }}
      initialValues={{
        login: ""
      }}
    >
      {({ handleSubmit }) => (
        <StyledFormWrapper>
          <StyledForm onSubmit={handleSubmit}>
            <StyledFormLogo />

            <Field
              name="login"
              label="Email, or Username"
              type="text"
              component={InputField}
            />

            <StyledFormButton type="submit">Send Login Link</StyledFormButton>

            <Divider>Or</Divider>

            <StyledLink to="/sign-up">Create New Account</StyledLink>
          </StyledForm>

          <StyledFormFooter>
            <StyledLink to="/sign-in">Back To Login</StyledLink>
          </StyledFormFooter>
        </StyledFormWrapper>
      )}
    </Formik>
  );
};

export default ForgotPassword;
