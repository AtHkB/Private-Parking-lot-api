const ParkinSpot = require("../schemas/ParkinSpot");
exports.getAll = async (req, res) => {
  try {
    const parkinSpot = await ParkinSpot.find().populate("bookings");
    return res.json({ parkinSpot }).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const parkinSpot = await ParkinSpot.find({
      _id: id,
    }).populate("bookings");
    return res.json({ parkinSpot }).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
