const { User, Domain } = require("../models");
const jwt = require("jsonwebtoken");

exports.createToken = async (req, res, next) => {
  const { clientSecret } = req.body;
  try {
    const domain = await Domain.findOne({
      where: { clientSecret },
      include: [
        {
          model: User,
          attibutes: ["id", "nick"],
        },
      ],
    });
    if (!domain) {
      res.status(401).json({
        code: 401,
        message: "등록되지 않은 도메인 입니다.",
      });
    }
    const token = jwt.sign(
      {
        id: domain.User.id,
        nick: domain.User.nick,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1m",
        issuer: "jonghun",
      }
    );
    return res.json({
      code: 200,
      message: "success",
      token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: '서버 에러'
    })
  }
};

exports.tokenTest = async (req, res, next) => {
  try {
    res.json(res.locals.decoded);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
