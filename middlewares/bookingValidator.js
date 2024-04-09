const { body } = require("express-validator");
const Booking = require("../schemas/Booking");

exports.createBookingValidator = [
  body("startDate").not().isEmpty().withMessage("The startDate is mandatory"),
  body("endDate").not().isEmpty().withMessage("The endDate is mandatory"),
  body("parkingspotID")
    .not()
    .isEmpty()
    .withMessage("The parkingspotID is mandatory"),
  body("userID").not().isEmpty().withMessage("The userID is mandatory"),

  // .custom(async (value) => {
  //   const existingUserWithParkingSpot = await UserWithParkingSpot.findOne({
  //     email: value,
  //   });
  //   console.log("existingUserWithParkingSpot", existingUserWithParkingSpot);
  //   if (existingUserWithParkingSpot !== null) {
  //     throw new Error("A user already exists with this e-mail address");
  //   }
  // }),
];
exports.updateBookingValidator = [
  body("startDate").not().isEmpty().withMessage("The startDate is mandatory"),
  body("endDate").not().isEmpty().withMessage("The endDate is mandatory"),
  body("bookingStatus")
    .not()
    .isEmpty()
    .withMessage("The bookingStatus is mandatory"),
];
