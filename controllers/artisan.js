const artisan = require("../models/artisan");

const getAllArtisan = async (req, res) => {
  const artisans = artisan.find({});

  res.status(200).json({ artisans: artisans });
};



module.exports = { getAllArtisan };
