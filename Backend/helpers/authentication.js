const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/");

async function authentiaction(req, res, next) {

  let access_token = req.headers.access_token;
  try {
    if (!access_token) {
      throw { name: "invalidToken" };
    }

    let payload = verifyToken(access_token);
    let user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "invalidToken" };
    }
    req.user = {
      id: user.id,
      role: user.role,
    };
    
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authentiaction,
};
