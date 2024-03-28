const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./dbinit");
const PORT = process.env.PORT || 8081;

connectDB();
//middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcom to Private Parking Spot API");
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
