const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./dbinit");
const userWithParkingSpotRouter = require("./routes/UserWithParkingSpotRouter");
const PORT = process.env.PORT || 8081;

connectDB();
//middlewares
app.use(express.json());
app.use(cors());

//use router
app.use([userWithParkingSpotRouter]);

app.get("/", (req, res) => {
  res.status(200).send("Welcom to Private Parking Spot API");
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
