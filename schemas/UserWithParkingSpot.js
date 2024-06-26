const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserWithParkingSpotSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  fullName: {
    type: String,
  },
  parkingSpots: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkingSpot",
    },
  ],
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
});

// static custom login method

UserWithParkingSpotSchema.statics.login = async function (email, password) {
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

UserWithParkingSpotSchema.statics.signup = async function (
  email,
  password,
  fullName
) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash, fullName });
  return user;
};

module.exports = mongoose.model(
  "UserWithParkingSpot",
  UserWithParkingSpotSchema
);
