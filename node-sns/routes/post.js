const express = require("express");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/index");
const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new S3Client();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "mys3image",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

router.post(
  "/img",
  isLoggedIn,
  upload.array("img", 1),
   (req, res, next) => {
    res.send("Successfully uploaded " + req.files.length + " files!");
  }
);
// router.post('/', isLoggedIn, )

module.exports = router;
