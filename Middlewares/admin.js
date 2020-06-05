const { User } = require("../Models/User");

let admin = async (req, res, next) => {
  const { _id } = req.user;

  const findUser = await User.findById({ _id });

  findUser.role === 0
    ? res.status(400).json({
        isAdmin: false,
        message: "Sorry you are not allowed only admins can access this server"
      })
    : req.user;
  next();
};

module.exports = { admin };
