const User = require("../models/user");
const Artisan = require("../models/artisan");
const Comment = require("../models/comment");

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

const addComment = async (req, res) => {
  const { artisanId, userId } = req.params;

  const user = await User.findById(userId);

  const artisan = await Artisan.findByIdAndUpdate(
    { _id: artisanId },
    { $addToSet: { comments: { ...req.body, createdBy: user.username } } },
    { new: true, runValidators: true }
  );
  res.json(artisan);
};

const addLikes = async (req, res) => {
  const { artisanId, commentId, userId } = req.params;
  const artisan = await Artisan.findOneAndUpdate(
    { _id: artisanId, "comments.commentId": commentId },
    {
      $push: {
        "comments.$.likes": userId,
      },
    },
    { new: true, runValidators: true }
  );
  res.json(artisan);
};

const unLike = async (req, res) => {
  const { artisanId, commentId, userId } = req.params;
  const artisan = await Artisan.findOneAndUpdate(
    { _id: artisanId, "comments.commentId": commentId },
    {
      $pull: {
        "comments.$.likes": userId,
      },
    },
    { new: true, runValidators: true }
  );
  res.json(artisan);
};

module.exports = { getAllUsers, addComment, addLikes, unLike};
