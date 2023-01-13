const Artisan = require("../models/artisan");

const getAllArtisan = async (req, res) => {
  const artisans = await Artisan.find({});

  res.status(200).json({ artisans: artisans });
};



module.exports = { getAllArtisan };
