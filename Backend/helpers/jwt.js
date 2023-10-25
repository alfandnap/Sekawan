const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET || "jwtsecret");
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET || "jwtsecret");
}

module.exports = {signToken, verifyToken};
