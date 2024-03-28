const mongoose = require("mongoose");

const ParkingSpotSchema = new mongoose.Schema({
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserWithParkingSpot",
  },
});

module.exports = mongoose.model("ParkingSpot", ParkingSpotSchema);
