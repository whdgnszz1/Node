const express = require("express");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/index");
const { afterUploadImage, uploadPost } = require("../controllers/post");
const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

const s3 = new S3Client();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "mys3image",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now().toString()}${ext}`);
    },
  }),
});

router.post("/img", isLoggedIn, upload.single("img"), afterUploadImage);

const upload2 = multer();
router.post("/", isLoggedIn, upload2.none(), uploadPost);

module.exports = router;
