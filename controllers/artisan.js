const Artisan = require("../models/artisan");

const getAllArtisan = async (req, res) => {
  const artisans = await Artisan.find({});

  res.status(200).json(artisans);
};

const getArtisan = async (req, res) => {
  const { id } = req.params;
  const artisan = await Artisan.findById({ _id: id });

  res.status(200).json(artisan);
};

const readComment = async (req, res) => {
  const { artisanId, commentId } = req.params;

  const artisan = await Artisan.findOneAndUpdate(
    { _id: artisanId, "comments.commentId": commentId },
    { $set: { "comments.$.read": true } },
    { new: true, runValidators: true }
  );

  res.json({ artisan });
};
module.exports = { getAllArtisan, getArtisan, readComment };
