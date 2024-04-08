const express = require("express");
const {
  createUserWithParkingSpotValidator,
} = require("../middlewares/userWithParkingSpotValidator");
const {
  createUserWithParkingSpot,
  getAllUserWithParkingSpot,
  login,
} = require("../controllers/userWithParkingSpot");
const userWithParkingSpotAuth = require("../middlewares/userWithParkingSpotAuth");

const api = express.Router();
api
  .route("/user-with-parking-spot")
  .post(createUserWithParkingSpotValidator, createUserWithParkingSpot)
  .get(getAllUserWithParkingSpot);
api.route("/user-with-parking-spot/login").post(login);

module.exports = api;
