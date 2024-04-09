const { body } = require("express-validator");
const dateRangeValidator = (startDate, { req }) => {
  const endDate = req.body.endDate;
  if (startDate >= endDate) {
    throw new Error("Start date must be less than end date");
  }
  return true;
};
exports.createBookingValidator = [
  // Check if start date is provided and is a valid date
  body("startDate").exists().isISO8601(),
  // Check if end date is provided and is a valid date
  body("endDate").exists().isISO8601(),
  // Custom validation to ensure start date is less than end date
  body("startDate").custom(dateRangeValidator),
  body("parkingspotID")
    .not()
    .isEmpty()
    .withMessage("The parkingspotID is mandatory"),
  body("userID").not().isEmpty().withMessage("The userID is mandatory"),
];
exports.updateBookingValidator = [
  body("bookingStatus")
    .not()
    .isEmpty()
    .withMessage("The bookingStatus is mandatory"),
];
