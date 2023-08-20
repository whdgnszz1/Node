const express = require("express");
const router = express.Router();
const {
  renderProfile,
  renderJoin,
  renderMain,
  renderHashtag,
} = require("../controllers/page");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/index");

// 라우터들에서 공통적으로 쓸 수 있는 변수
router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user?.Followers?.lentgh || 0;
  res.locals.followingCount = req.user?.Followings?.length || 0;
  res.locals.followingList = req.user?.Followings?.map((v) => v.id) || [];
  next();
});

router.get("/profile", isLoggedIn, renderProfile);
router.get("/join", isNotLoggedIn, renderJoin);
router.get("/", renderMain);
router.get("/hashtag", renderHashtag);

module.exports = router;
