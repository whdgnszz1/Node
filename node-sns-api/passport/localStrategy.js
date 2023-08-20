// localStrategy가 실행이 되면서 이 사람이 로그인해도 되는지 안되는지 판단
// 로그인 시켜도 되는 사용자일 경우 ../routes/auth 로 이동
const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = () => {
  // passport에 LocalStrategy를 등록해두는 코드 ( 이메일 로그인했을 때 어떻게 할지 )
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", // req.body.email
        passwordField: "password", // req.body.password
        passReqToCallBack: false,
      },
      async (email, password, done) => {
        // done( 서버실패, 성공유저, 로직실패)
        // done이 호출되는 순간 ../routes/auth로 이동
        // 로그인을 해도되는지 안해도 되는지 판단
        try {
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              // 성공시 사용자 정보를 넣어준다.
              done(null, exUser);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
