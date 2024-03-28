const mongoose = require("mongoose");

const UserWithParkingSpotSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  parkingSpots: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkingSpot",
    },
  ],
});

/* 
add the login & signup static methods

*/
// static custom login method

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("User doesn't exist or incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model(
  "UserWithParkingSpot",
  UserWithParkingSpotSchema
);
