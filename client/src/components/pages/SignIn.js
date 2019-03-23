import React, { useContext } from "react";
import { Formik, Field } from "formik";
import { useMutation } from "react-apollo-hooks";

import InputField from "../fields/InputField";
import SIGN_IN from "../../graphql/user/mutations/signIn";
import context from "../../context";

import StyledForm from "../styled/StyledForm";
import StyledFormLogo from "../styled/StyledFormLogo";
import StyledFormButton from "../styled/StyledFormButton";
import StyledLink from "../styled/StyledLink";
import StyledFormFooter from "../styled/StyledFormFooter";
import StyledFormWrapper from "../styled/StyledFormWrapper";
import Divider from "../Divider";

const SignIn = ({ history }) => {
  const { dispatch } = useContext(context);
  const login = useMutation(SIGN_IN);

  return (
    <Formik
      onSubmit={async (input, { setErrors }) => {
        const response = await login({
          variables: input
        });

        if (response.data.signIn) {
          history.push("/");
          dispatch({ type: "INIT_USER", payload: response.data.signIn });
        }
        if (response && response.data && !response.data.signIn) {
          setErrors({ login: "invalid login" });
        }
      }}
      initialValues={{
        login: "",
        password: ""
      }}
    >
      {({ handleSubmit }) => (
        <StyledFormWrapper>
          <StyledForm onSubmit={handleSubmit}>
            <StyledFormLogo />

            <Field
              name="login"
              label="Username, or email"
              type="text"
              component={InputField}
            />
            <Field
              name="password"
              label="Password"
              type="password"
              component={InputField}
            />

            <StyledFormButton type="submit">Log in</StyledFormButton>

            <Divider>Or</Divider>

            <StyledLink to="/forgot-password">Forgot password?</StyledLink>
          </StyledForm>

          <StyledFormFooter>
            Don't have an account?
            <StyledLink to="/sign-up"> Sign up</StyledLink>
          </StyledFormFooter>
        </StyledFormWrapper>
      )}
    </Formik>
  );
};

export default SignIn;
