const jwt = require("jsonwebtoken");
const User = require("../schemas/User");

const userAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Not Authorized" });
  }
  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id: id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Not Authorized" });
  }
};

module.exports = userAuth;
