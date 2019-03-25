import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

aws.config.update({
  secretAccessKey: process.env.AWS_KEY,
  accessKeyId: process.env.AWS_ID,
  region: "us-east-1"
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid Mime Type, only JPEG and PNG"), false);
  }
};

export default multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: "react-instagram-clone",
    acl: "public-read",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: "TESTING_META_DATA" });
    },
    key: function(req, file, cb) {
      cb(
        null,
        `${Date.now().toString()}.${file.originalname.split(".").pop()}`
      );
    }
  })
});
