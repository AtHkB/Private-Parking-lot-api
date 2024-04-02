const express = require("express");
const {
  createUserWithParkingSpotValidator,
} = require("../middlewares/userWithParkingSpotValidator");
const {
  createUserWithParkingSpot,
  getAllUserWithParkingSpot,
} = require("../controllers/userWithParkingSpot");
const api = express.Router();
api
  .route("/user-with-parking-spot")
  .post(createUserWithParkingSpotValidator, createUserWithParkingSpot)
  .get(getAllUserWithParkingSpot);

module.exports = api;
