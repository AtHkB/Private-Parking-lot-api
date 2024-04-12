const User = require("../../schemas/User");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //create token
    const token = createToken(user._id);
    const id = user._id;
    const fullName = user.fullName;
    res.status(200).json({ email, token, id, fullName });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// sign up user
const signUpUser = async (req, res) => {
  let { email, password, fullName } = req.body;

  try {
    const user = await User.signup(email, password, fullName);
    const id = user._id;
    fullName = user.fullName;
    //create token
    const token = createToken(user._id);
    res.status(200).json({ email, token, id, fullName });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signUpUser };
