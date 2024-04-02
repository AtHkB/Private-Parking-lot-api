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

// static custom signup method
// PLEASE CHECK AND COMMENT IF !OK

userSchema.static.signup = async function (email, password) {
  const exists = await this.findOne({ email });
};

userSchema.statics.signup = async function (email, password) {
  //validation
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }
  if (!email || !password) {
    throw Error("All fields are mandatory");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }
  if (!validator.isStrongPassword) {
    throw Error(
      "Make sure to use at least 8 characters, one upper case letter, a number and a symbol"
    );
  }
  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

module.exports = mongoose.model(
  "UserWithParkingSpot",
  UserWithParkingSpotSchema
);
