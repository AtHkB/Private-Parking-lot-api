const express = require("express");
const {
  createBooking,
  updateBooking,
  getBookingByUserId,
} = require("../controllers/booking");
const {
  createBookingValidator,
  updateBookingValidator,
} = require("../middlewares/bookingValidator");

const api = express.Router();

api.route("/bookings").post(createBookingValidator, createBooking);
api.route("/bookings/:id").put(updateBookingValidator, updateBooking);
api.route("/bookings/userid/:id").get(getBookingByUserId);
module.exports = api;
