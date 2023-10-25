const { comparePassword } = require('../helpers/bcryptjs');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models/')

class UserController {

  static async register(req, res, next) {
    try {
      const {
        username,
        password,
        role
      } = req.body;

      const user = await User.create({
        username,
        password,
        role
      });

      res.status(201).json({
        message: `user with username ${username} succesfully created`,
      });

    } catch (error) {
      next(error);
    }

  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username) throw { name: "UsernamePasswordEmpty" };

      if (!password) throw { name: "UsernamePasswordEmpty" };

      const user = await User.findOne({ where: { username } });

      if (!user) throw { name: "UsernamePasswordInvalid" };

      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) throw { name: "UsernamePasswordInvalid" };

      let payload = {
        id: user.id,
        username: user.username,
        role: user.role
      };

      let access_token = signToken(payload);

      res.status(200).json({
        access_token,
        username,
        role: user.role
      });

    } catch (error) {
      next(error);
    }
  }

}

module.exports = UserController