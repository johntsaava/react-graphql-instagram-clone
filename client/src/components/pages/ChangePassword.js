import React, { useContext } from "react";
import { useMutation } from "react-apollo-hooks";
import { Formik, Field } from "formik";

import context from "../../context";
import InputField from "../fields/InputField";
import changePassword from "../../graphql/user/mutations/changePassword";

import StyledForm from "../styled/StyledForm";
import StyledFormLogo from "../styled/StyledFormLogo";
import StyledFormButton from "../styled/StyledFormButton";
import StyledFormWrapper from "../styled/StyledFormWrapper";

const ChangePassword = ({ history, match }) => {
  const change = useMutation(changePassword);
  const { dispatch } = useContext(context);

  return (
    <Formik
      onSubmit={async ({ password }) => {
        const response = await change({
          variables: {
            input: {
              password,
              token: match.params.token
            }
          }
        });
        if (response.data.changePassword) {
          history.push("/");
          dispatch({
            type: "INIT_USER",
            payload: response.data.changePassword
          });
        }
      }}
      initialValues={{
        password: ""
      }}
    >
      {({ handleSubmit }) => (
        <StyledFormWrapper>
          <StyledForm onSubmit={handleSubmit}>
            <StyledFormLogo />

            <Field
              name="password"
              label="Password"
              type="password"
              component={InputField}
            />

            <StyledFormButton type="submit">Change Password</StyledFormButton>
          </StyledForm>
        </StyledFormWrapper>
      )}
    </Formik>
  );
};

export default ChangePassword;
