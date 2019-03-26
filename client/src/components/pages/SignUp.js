import React from "react";
import { Formik, Field } from "formik";
import { useMutation } from "react-apollo-hooks";
import * as Yup from "yup";

import InputField from "../fields/InputField";
import signUp from "../../graphql/user/mutations/signUp";

import StyledForm from "../styled/StyledForm";
import StyledFormLogo from "../styled/StyledFormLogo";
import StyledFormButton from "../styled/StyledFormButton";
import StyledLink from "../styled/StyledLink";
import StyledFormFooter from "../styled/StyledFormFooter";
import StyledFormWrapper from "../styled/StyledFormWrapper";
import StyledFormDescription from "../styled/StyledFormDescription";

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too short")
    .max(50, "Too long")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too short")
    .max(50, "Too long")
    .required("Required"),
  username: Yup.string()
    .min(2, "Too short")
    .max(50, "Too long")
    .required("Required"),
  password: Yup.string()
    .required("No password provided")
    .min(6, "Too short")
    .max(42, "Too long"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required")
});

const SignUp = ({ history }) => {
  const register = useMutation(signUp);

  return (
    <Formik
      validationSchema={SignUpSchema}
      onSubmit={async (input, { setErrors }) => {
        try {
          await register({
            variables: {
              input
            }
          });
          history.push("/check-email");
        } catch (err) {
          const errors = {};
          if (err.graphQLErrors[0].message.indexOf("username") > 0)
            errors.username = "already taken";
          if (err.graphQLErrors[0].message.indexOf("email") > 0)
            errors.email = "already taken";
          setErrors(errors);
        }
      }}
      initialValues={{
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: ""
      }}
    >
      {({ handleSubmit }) => (
        <StyledFormWrapper>
          <StyledForm onSubmit={handleSubmit}>
            <StyledFormLogo />

            <StyledFormDescription>
              Sign up to see photos from your friends.
            </StyledFormDescription>

            <Field
              name="email"
              type="email"
              label="Email"
              component={InputField}
            />
            <Field
              name="firstName"
              type="text"
              label="First Name"
              component={InputField}
            />
            <Field
              name="lastName"
              type="text"
              label="Last Name"
              component={InputField}
            />
            <Field
              name="username"
              type="text"
              label="Username"
              component={InputField}
            />
            <Field
              name="password"
              label="Password"
              type="password"
              component={InputField}
            />

            <StyledFormButton type="submit">Sign up</StyledFormButton>
          </StyledForm>

          <StyledFormFooter>
            Have an account?<StyledLink to="/sign-in"> Log in</StyledLink>
          </StyledFormFooter>
        </StyledFormWrapper>
      )}
    </Formik>
  );
};

export default SignUp;
