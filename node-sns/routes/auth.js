const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { join, login, logout } = require("../controllers/auth");

router.post("/join", isNotLoggedIn, join);

// passport에 local이 있으면 ./passport/index로 이동
router.post("/login", isNotLoggedIn, login);

router.get("/logout", isLoggedIn, logout);

module.exports = router;
