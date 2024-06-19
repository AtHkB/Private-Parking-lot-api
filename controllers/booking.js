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
    let { parkingspotID, startDate, endDate, userID } = req.body;
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const bookingStatus = BookingStatus.BOOK;
    const booking = await Booking.findOne({
      parkingSpots: [parkingspotID],
      $or: [
        { startDate: { $lte: endDate }, endDate: { $gte: startDate } }, // Overlapping events
        { startDate: { $gte: startDate, $lte: endDate } }, // Event starting during the new range
        { endDate: { $gte: startDate, $lte: endDate } }, // Event ending during the new range
      ],
    });
    if (booking?._id) {
      return res
        .json({ message: "booking in the selected time is not possible" })
        .status(200);
    } else {
      let createdbooking;
      if (booking == null) {
        createdbooking = await Booking.create({
          bookingStatus,
          parkingspotID,
          userID,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        });
        createdbooking = await createdbooking.save();
      }

      const updatedBooking = await Booking.findOneAndUpdate(
        { _id: createdbooking._id },
        { parkingSpots: parkingspotID, user: userID },
        { new: true }
      );
      const updatedParkingSpot = await ParkingSpot.findOneAndUpdate(
        { _id: parkingspotID },
        { bookings: createdbooking._id },
        { new: true }
      );

      return res.json({ updatedBooking, updatedParkingSpot }).status(200);
    }
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
    const { bookingStatus } = req.body;
    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: id },
      { bookingStatus },
      { new: true }
    );
    if (updatedBooking == null) {
      return res
        .json({ message: `the booking with this ${id} id not found ` })
        .status(200);
    }
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
