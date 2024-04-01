const express = require("express");
const api = express.Router();
const {
  createUserWithParkingSpot,
  getAllUserWithParkingSpot,
} = require("../controllers/userWithParkingSpot");

api
  .route("/user-with-parking-spot")
  .post(createUserWithParkingSpot)
  .get(getAllUserWithParkingSpot);

module.exports = api;
