const express = require("express");
const router = express.Router();
const {
  renderProfile,
  renderJoin,
  renderMain,
} = require("../controllers/page");

// 라우터들에서 공통적으로 쓸 수 있는 변수
router.use((req, res, next) => {
  res.locals.user = null;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followingList = [];
  next();
});

router.get("/profile", renderProfile);
router.get("/join", renderJoin);
router.get("/", renderMain);

module.exports = router;
