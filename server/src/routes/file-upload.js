import express from "express";
import upload from "../services/awsS3";

const router = express.Router();

const singleUpload = upload.single("image");

router.post("/image-upload", (req, res) => {
  singleUpload(req, res, err => {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "File Upload Error", detail: err.message }]
      });
    }
    return res.json({ imageUrl: req.file.location });
  });
});
export default router;
