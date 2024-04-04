const User = require("../schemas/User");
const { loginUser, signUpUser } = require("./helpers/authUserHelper");

exports.createUser = async (req, res) => {};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  return loginUser(req, res);
};
exports.signup = async (req, res) => {
  return signUpUser(req, res);
};
