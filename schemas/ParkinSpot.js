const mongoose = require("mongoose");

const ParkingSpotSchema = new mongoose.Schema({
  location: [
    {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
  ],
  note: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  hauseNumber: {
    type: String,
    required: true,
  },
  streetName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  bookingStatus: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
});

module.exports = mongoose.model("ParkingSpot", ParkingSpotSchema);
