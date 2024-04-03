const express = require("express");
const {
  createUser,
  getAllUsers,
  login,
  signup,
} = require("../controllers/user");

const api = express.Router();

api.route("/users").post(createUser).get(getAllUsers);
api.route("/users/login").post(login);
api.route("/users/signup").post(signup);

module.exports = api;
