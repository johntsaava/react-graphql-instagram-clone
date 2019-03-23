import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Formik, Field } from "formik";
import { useMutation } from "react-apollo-hooks";
import * as Yup from "yup";

import EDIT_ACCOUNT from "../../graphql/user/mutations/editAccount";
import context from "../../context";
import PictureUpload from "../PictureUpload";
import InputField from "../fields/InputField";

import StyledForm from "../styled/StyledForm";
import StyledFormButton from "../styled/StyledFormButton";
import StyledFormWrapper from "../styled/StyledFormWrapper";

const Picture = styled.div`
  width: 100%;
  max-width: 200px;
  background: url(${props => props.url}) center no-repeat;
  background-size: cover;
  border-radius: 50%;
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const UploadWrapper = styled.div`
  margin: 10px 0 20px 0;
`;

const EditAccountSchema = Yup.object().shape({
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
  email: Yup.string()
    .email("Invalid email")
    .required("Required")
});

const EditAccount = () => {
  const { state } = useContext(context);
  const [picture, usePicture] = useState(null);
  const [pictureUrl, usePictureUrl] = useState(null);
  const edit = useMutation(EDIT_ACCOUNT);

  useEffect(() => {
    if (picture) usePictureUrl(URL.createObjectURL(picture));
  }, [picture]);

  return (
    state.user && (
      <Formik
        validationSchema={EditAccountSchema}
        onSubmit={async input => {
          try {
            if (picture) {
              input = { ...input, picture };
            }
            await edit({
              variables: {
                input
              }
            });
          } catch (err) {
            console.log(err);
          }
        }}
        initialValues={{
          firstName: state.user.firstName,
          lastName: state.user.lastName,
          username: state.user.username,
          email: state.user.email
        }}
      >
        {({ handleSubmit }) => (
          <StyledFormWrapper>
            <StyledForm onSubmit={handleSubmit}>
              <Picture
                url={pictureUrl ? pictureUrl : state.user.profilePictureUrl}
              />
              <UploadWrapper>
                <PictureUpload usePicture={usePicture} />
              </UploadWrapper>

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
                name="email"
                type="email"
                label="Email"
                component={InputField}
              />

              <StyledFormButton type="submit">Submit</StyledFormButton>
            </StyledForm>
          </StyledFormWrapper>
        )}
      </Formik>
    )
  );
};

export default EditAccount;
