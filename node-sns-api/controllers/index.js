const { User, Domain } = require("../models");
const { v4: uuidv4 } = require("uuid");

exports.renderLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      // where에는 undefined가 들어가면 안됨.
      // 혹시나 undefined가 나올 것 같다 하면 null로 바꿔준다.
      where: { id: req.user?.id || null },
      include: { model: Domain },
    });
    res.render("login", {
      user,
      domains: user?.Domains,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.createDomain = async (req, res, next) => {
  try {
    await Domain.create({
      UserId: req.user.id,
      host: req.body.host,
      type: req.body.type,
      clientSecret: uuidv4(),
    });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};
