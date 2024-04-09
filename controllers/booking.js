const Booking = require("../schemas/Booking");
const ParkingSpot = require("../schemas/ParkinSpot");
const { validationResult } = require("express-validator");
const BookingStatus = require("../enums/bookingStatus");

exports.createBooking = async (req, res) => {
  // sanitize data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { parkingspotID, startDate, endDate, userID } = req.body;
    const bookingStatus = BookingStatus.BOOK;

    const booking = await Booking.findOne({
      bookingStatus,
      parkingspotID,
      userID,
      startDate,
      endDate,
    });
    let createdbooking;
    if (booking == null) {
      createdbooking = await Booking.create({
        bookingStatus,
        parkingspotID,
        userID,
        startDate,
        endDate,
      });
      createdbooking = await createdbooking.save();
    }

    const bookingObj = booking == null ? createdbooking._id : booking._id;
    console.log(bookingObj);
    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: bookingObj._id },
      { parkingSpots: parkingspotID, user: userID },
      { new: true }
    );
    const updatedParkingSpot = await ParkingSpot.findOneAndUpdate(
      { _id: parkingspotID },
      { bookings: bookingObj._id },
      { new: true }
    );

    return res.json({ updatedBooking, updatedParkingSpot }).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.updateBooking = async (req, res) => {
  // sanitize data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = req.params;
    const { startDate, endDate, bookingStatus } = req.body;
    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: id },
      { startDate, endDate, bookingStatus },
      { new: true }
    );
    return res.json({ updatedBooking }).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getBookingByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.find({
      user: id,
    }).populate("parkingSpots");
    return res.json({ booking }).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
