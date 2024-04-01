/* 
in the controller for user creation after the user has been created and saved, we need to also create a parking spot. meaning we need to import both the userWithParkingSpotSchema & the ParkingSpotSchema.


*/

const ParkingSpot = require("../schemas/ParkinSpot");
const UserWithParkingSpot = require("../schemas/UserWithParkingSpot");

exports.createUserWithParkingSpot = async (req, res) => {
  // sanitize data
  // make sure all the data is the way it's supposed to be
  const { email, password, location } = req.body;
  try {
    // Find or create new userWithParkingSpot
    const userWithParkingSpot = await UserWithParkingSpot.findOne({
      email,
    });
    let createduserWithParkingSpot;
    if (!userWithParkingSpot) {
      createduserWithParkingSpot = await UserWithParkingSpot.create({
        email,
        password,
      });
      createduserWithParkingSpot = await createduserWithParkingSpot.save();
    }
    // Find or create new ParkingSpot
    const queryFindUserWithParkingSpot = userWithParkingSpot
      ? userWithParkingSpot._id
      : createduserWithParkingSpot._id;
    // Find existing userWithParkingSpot by userId
    const parkingSpot = await ParkingSpot.findOne({
      user: queryFindUserWithParkingSpot.toHexString(),
    });
    let createdParkingSpot;
    if (!parkingSpot) {
      // Create a parkingSpot and associate it with the user
      createdParkingSpot = await ParkingSpot.create({
        user: { _id: queryFindUserWithParkingSpot._id },
        location,
      });
      createdParkingSpot = await createdParkingSpot.save();
    } else {
      const updatedParkingSpot = await ParkingSpot.findOneAndUpdate(
        { _id: parkingSpot._id },
        { location: location },
        { new: true }
      );
    }

    const queryUpdateUserWithParkingSpot = parkingSpot
      ? parkingSpot._id
      : createdParkingSpot._id;
    const updatedUser = await UserWithParkingSpot.findOneAndUpdate(
      { _id: queryFindUserWithParkingSpot },
      { parkingSpots: queryUpdateUserWithParkingSpot },
      { new: true }
    );
    return res.json({ updatedUser }).status(200);
  } catch (err) {
    console.error(err);
    return res.json({ error: err.message }).status(400);
  }
};

exports.getAllUserWithParkingSpot = async (req, res) => {
  try {
    const userWithParkingSpots = await UserWithParkingSpot.find().populate(
      "parkingSpots"
    );
    res.json({ userWithParkingSpots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
