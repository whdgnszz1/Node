const axios = require("axios");

exports.test = async (req, res, next) => {
  try {
    // token이 없는 경우에만 token 발급
    if (!req.session.jwt) {
      const tokenResult = await axios.post("http://localhost:8002/v1/token", {
        clientSecret: process.env.CLIENT_SECRET,
      });
      if (tokenResult.data?.code === 200) {
        req.session.jwt = tokenResult.data.token;
      } else {
        // 토큰 발급 실패사유를 브라우저로 전달
        return res.status(tokenResult.data?.code).json(tokenResult.data);
      }
    }

    const result = await axios.get("http://localhost:8002/v1/test", {
      headers: { authorization: req.session.jwt },
    });
    return res.json(result.data);
  } catch (error) {
    console.error(error);
    if (error.response?.status === 419) {
      return res.json(error.response.data);
    }
    return next(error);
  }
};
