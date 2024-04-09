const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  note: {
    type: String,
  },
  bookingStatus: {
    type: String,
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
    ref: "UserWithParkingSpot",
  },
  parkingSpots: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkingSpot",
    },
  ],
});

module.exports = mongoose.model("Booking", BookingSchema);
