const { body } = require("express-validator");
const UserWithParkingSpot = require("../schemas/UserWithParkingSpot");

exports.createUserWithParkingSpotValidator = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("The email is mandatory")
    .isEmail()
    .withMessage("Not a valid e-mail address")
    .custom(async (value) => {
      const existingUserWithParkingSpot = await UserWithParkingSpot.findOne({
        email: value,
      });
      if (existingUserWithParkingSpot !== null) {
        throw new Error("A user already exists with this e-mail address");
      }
    }),
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
  body("note").not().isEmpty().withMessage("The Instructions is mandatory"),
  body("price").not().isEmpty().withMessage("The price is mandatory"),
  body("hauseNumber")
    .not()
    .isEmpty()
    .withMessage("The hauseNumber is mandatory"),
  body("postalCode").not().isEmpty().withMessage("The postalCode is mandatory"),
  body("streetName").not().isEmpty().withMessage("The streetName is mandatory"),
  body("title").not().isEmpty().withMessage("The title is mandatory"),
];
