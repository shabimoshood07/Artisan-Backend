const Artisan = require("../models/artisan");

const getAllArtisan = async (req, res) => {
  const artisans = await Artisan.find({});

  res.status(200).json({ artisans: artisans });
};
const getArtisan = async (req, res) => {
  const { id } = req.params;
  const artisan = await Artisan.find({ _id: id });

  res.status(200).json(artisan);
};

module.exports = { getAllArtisan, getArtisan };
