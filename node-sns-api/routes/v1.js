const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares");
const { createToken, tokenTest, getMyPosts, getPostsByHashtag } = require("../controllers/v1");

router.post("/token", createToken);
router.get("/test", verifyToken, tokenTest);

router.get("/posts/my", verifyToken, getMyPosts);
router.get("/posts/hashtag/:title", verifyToken, getPostsByHashtag);

module.exports = router;
