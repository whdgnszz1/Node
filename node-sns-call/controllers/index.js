const axios = require("axios");

const URL = "http://localhost:8002/v1";
axios.defaults.headers.origin = "http://localhost:4000";

const request = async (req, api) => {
  try {
    if (!req.session.jwt) {
      const tokenResult = await axios.get(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      });
      req.session.jwt = tokenResult.data.token;
    }

    return await axios.get(`${URL}${api}`, {
      headers: { authorization: req.session.jwt },
    });
  } catch (error) {
    if (error.response?.status === 419) {
      delete req.session.jwt;
      return request(req, api);
    }
    return error.response;
  }
};

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
    throw error.response;
  }
};

exports.getMyPosts = async (req, res, next) => {
  try {
    const result = await request(req, "/posts/my");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.searchByHashtag = async (req, res, next) => {
  try {
    const result = await request(req, `/posts/hashtag/${req.params.hashtag}`);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
