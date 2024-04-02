const { body } = require("express-validator");
const UserWithParkingSpot = require("../schemas/UserWithParkingSpot");

exports.createUserWithParkingSpotValidator = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("The email is mandatory")
    .isEmail()
    .withMessage("Not a valid e-mail address"),
  //TODO uncomment in end when we need to check exist user email
  // .custom(async (value) => {
  //   const existingUserWithParkingSpot = await UserWithParkingSpot.findOne({
  //     email: value,
  //   });
  //   console.log("existingUserWithParkingSpot", existingUserWithParkingSpot);
  //   if (existingUserWithParkingSpot !== null) {
  //     throw new Error("A user already exists with this e-mail address");
  //   }
  // })
  body("password")
    .not()
    .isEmpty()
    .withMessage("The password is mandatory")
    .isLength({ min: 6 }),
  body("location")
    .not()
    .isEmpty()
    .withMessage("The location is mandatory")
    .isArray()
    .withMessage("The location data should be array"),
];
