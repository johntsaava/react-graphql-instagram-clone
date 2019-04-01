import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Formik, Field } from "formik";
import { useMutation } from "react-apollo-hooks";
import * as Yup from "yup";
import axios from "axios";

import EDIT_ACCOUNT from "../../graphql/user/mutations/editAccount";
import context from "../../context";
import PictureUpload from "../PictureUpload";
import InputField from "../fields/InputField";

import StyledForm from "../styled/StyledForm";
import StyledFormButton from "../styled/StyledFormButton";
import StyledFormWrapper from "../styled/StyledFormWrapper";
import userAvatar from "../../user.jpg";

const Picture = styled.div`
  width: 100%;
  max-width: 150px;
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
  margin: 20px 0 25px 0;
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

const EditAccount = ({ history }) => {
  const { state, dispatch } = useContext(context);
  const [picture, setPicture] = useState(null);
  const [picturePreview, setPicturePreview] = useState(null);
  const edit = useMutation(EDIT_ACCOUNT);

  useEffect(() => {
    if (picture) setPicturePreview(URL.createObjectURL(picture));
  }, [picture]);

  return (
    state.user && (
      <Formik
        validationSchema={EditAccountSchema}
        onSubmit={async input => {
          try {
            if (picture) {
              const formdata = new FormData();
              formdata.append("image", picture);

              const pictureData = await axios.post(
                "https://react-instagram-clone-server.herokuapp.com/api/image-upload",
                formdata,
                {
                  headers: {
                    "Content-Type": "multipart/form-data"
                  }
                }
              );
              input = {
                ...input,
                profilePictureUrl: pictureData.data.imageUrl
              };
            }
            const userData = await edit({
              variables: {
                input
              }
            });
            if (userData.data.editAccount) {
              dispatch({
                type: "INIT_USER",
                payload: userData.data.editAccount
              });

              history.push(`/user/${userData.data.editAccount.username}`);
            }
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
                url={
                  picturePreview || state.user.profilePictureUrl || userAvatar
                }
              />
              <UploadWrapper>
                <PictureUpload setPicture={setPicture} />
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
