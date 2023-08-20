const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

exports.join = async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    // done함수를 받는 부분
      if(authError){
        console.error(authError)
        return next(authError)
      }
      // 서버에러도 아니고 유저가 없는 경우 ( 로직 실패 )
      if(!user) {
        return res.redirect(`/?error=${info.message}`)
      }
      // 유저가 있는 경우
      // ../passport/index에 있는 passport.serializeUser 실행
      return req.login(user, (loginError) => {
        if(loginError) {
          console.error(loginError)
          return next(loginError)
        }
        // '/'으로 redirect
        return res.redirect('/')
      })
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout(() => {
    res.redirect('/')
  })
};


