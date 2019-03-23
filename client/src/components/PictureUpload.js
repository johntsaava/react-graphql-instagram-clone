import React from "react";

const PictureUpload = ({ usePicture, ...props }) => (
  <input
    {...props}
    type="file"
    onChange={({
      target: {
        validity,
        files: [file]
      }
    }) => {
      if (validity.valid) {
        usePicture(file);
      }
    }}
  />
);

export default PictureUpload;