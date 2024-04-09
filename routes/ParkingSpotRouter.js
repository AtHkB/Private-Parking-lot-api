const express = require("express");
const { getAll, getById } = require("../controllers/parkingspot");

const api = express.Router();

api.route("/parkingspots").get(getAll);
api.route("/parkingspots/:id").get(getById);

module.exports = api;
