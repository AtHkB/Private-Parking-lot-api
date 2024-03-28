/* 
in the controller for user creation after the user has been created and saved, we need to also create a parking spot. meaning we need to import both the userWithParkingSpotSchema & the ParkingSpotSchema.


*/

const ParkingSpot = require("../schemas/ParkinSpot");
const UserWithParkingSpot = require("../schemas/UserWithParkingSpot");
const UserWithParkingSpot = require("../schemas/UserWithParkingSpot");

const createUser = async (req, res) => {};
const createUserWithParkingSpot = async () => {
  // sanitize data
  // make sure all the data is the way it's supposed to be
  // create the user
  const userWithParkingSpot = await UserWithParkingSpot.create({
    email,
    password,
  });
  await userWithParkingSpot.save();

  var query = { username: req.user.username };
  req.newData.username = req.user.username;

  UserWithParkingSpot.findOneAndUpdate(
    query,
    req.newData,
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send("Succesfully saved.");
    }
  );
  // AFTER the user has been created and saved to the DB, we update that user
  // send an update request to the user.parkingSpots to insert the first spot of this user
};
