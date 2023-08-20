const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { join, login, logout } = require("../controllers/auth");

router.post("/join", isNotLoggedIn, join);

// passport에 local이 있으면 ./passport/index로 이동
router.post("/login", isNotLoggedIn, login);

router.get("/logout", isLoggedIn, logout);

// 카카오톡 로그인 화면으로 redirect
router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/?loginError=카카오 로그인 실패",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

// router.get('/auth/kakaoLogout', )



module.exports = router;
