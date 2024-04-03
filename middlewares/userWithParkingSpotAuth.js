const jwt = require("jsonwebtoken");
const UserWithParkingSpot = require("../schemas/UserWithParkingSpot");

const userWithParkingSpotAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Not Authorized" });
  }
  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    req.user = await UserWithParkingSpot.findOne({ _id: id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Not Authorized" });
  }
};

module.exports = userWithParkingSpotAuth;
