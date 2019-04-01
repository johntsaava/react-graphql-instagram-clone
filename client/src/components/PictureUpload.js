import React from "react";

const PictureUpload = ({ setPicture, ...props }) => (
  <input
    {...props}
    type="file"
    accept="image/*"
    onChange={({
      target: {
        validity,
        files: [file]
      }
    }) => {
      if (validity.valid) {
        setPicture(file);
      }
    }}
  />
);

export default PictureUpload;
