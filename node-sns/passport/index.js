const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const User = require("../models/user");

// app.js에서 passportConfig로 불러와지는 함수
// passport는 serializeUser, deserializeUser, strategy만 알면 끝남
module.exports = () => {
  // serializeUser가 실행되면 app.js에서 session으로 저장
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then((user) => done(null, user)) // req.user
      .catch((err) => done(err));
  });
  // routes/auth.js에서 passport.authenticate('local')이 실행되면
  // localStrategy 호출
  local();
};
