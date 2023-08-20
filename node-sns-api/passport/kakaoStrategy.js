const passport = require("passport");
const { Strategy: KakaoStrategy } = require("passport-kakao");
const User = require("../models/user");

module.exports = () => {
  // passport.authenticate('kakao') 하는 순간
  // passport에 등록한 KakaoStrategy 실행
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: "/auth/kakao/callback",
      },
      // accessToken, refreshToken은 카카오 API를 호출할때 사용.
      async (accessToken, refreshToken, profile, done) => {
        console.log("profile", profile);
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "kakao" },
          });
          if (!exUser) {
            // 회원가입 하는 로직
            const newUser =  await User.create({
              email: profile._jsons?.kakao_account?.email,
              nick: profile.displayName,
              provider: "kakao",
              snsId: profile.id,
            });
            // 회원가입 후에도 done으로 newUser 저장
            done(null, newUser)
          } else {
            // 로그인
            done(null, exUser)
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
