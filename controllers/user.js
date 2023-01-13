const User = require("../models/user");
const Artisan = require("../models/artisan");
const Comment = require("../models/comment");

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.send(200).json(users);
};

const addComment = async (req, res) => {
  const { artisanId, userId } = req.params;

  const user = await User.findById(userId);

  const artisan = await Artisan.findByIdAndUpdate(
    { _id: artisanId },
    { $addToSet: { comments: { ...req.body, createdBy: user._id } } },
    { new: true, runValidators: true }
  );
  res.json(artisan);
};

module.exports = { getAllUsers, addComment };
