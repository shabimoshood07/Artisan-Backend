const User = require("../models/user");
const Artisan = require("../models/artisan");
const Comment = require("../models/comment");

// Get all users
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

// Add comment
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



// Like comment
const addLikes = async (req, res) => {
  const { artisanId, commentId, userId } = req.params;

  const findArtisan = await Artisan.findOne({
    _id: artisanId,
    "comments.commentId": commentId,
  });
  // const user = await User.findOne({ _id: userId });


  const comment = await findArtisan.comments.filter(
    (comm) => comm.commentId == commentId
  );

  if (comment[0].likes.includes(userId)) {
    return res.json({ msg: "You can not like a comment twice" });
  }

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



// Unlike  comment
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



// addRating  comment
const addrating = async (req, res) => {
  const { artisanId, userId } = req.params;

  const artisan = await Artisan.findOneAndUpdate(
    { _id: artisanId },
    {
      $addToSet: {
        ratings: { ...req.body, createdBy: userId },
      },
    },
    { new: true, runValidators: true }
  );
  res.json(artisan);
};

module.exports = { getAllUsers, addComment, addLikes, unLike, addrating };
