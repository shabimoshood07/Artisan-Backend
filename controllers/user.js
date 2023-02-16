const User = require("../models/user");
const Artisan = require("../models/artisan");

// Get all users
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

// Add comment
const addComment = async (req, res) => {
  const { artisanId, userId } = req.params;
  // const { userId, role } = req.user;
  let commentBy;
  if (req.user) {
    const user = await User.findById(req.user.userId);
    commentBy = user.username;
  } else if (req.artisan) {
    const artisan = await Artisan.findById(req.artisan.artisanId);
    commentBy = artisan.businessName;
  }

  const artisan = await Artisan.findByIdAndUpdate(
    { _id: artisanId },
    { $addToSet: { comments: { ...req.body, createdBy: commentBy } } },
    { new: true, runValidators: true }
  );
  res.json({ msg: "comment sent successfuly" });
};

// merger like and unlike routes by using toggles

// Like comment
const addLikes = async (req, res) => {
  console.log(req.user);
  const { commentId, userId } = req.params;

  try {
    const findArtisan = await Artisan.findOne({
      "comments.commentId": commentId,
    });

    const comment = findArtisan.comments.filter(
      (comm) => comm.commentId == commentId
    );

    if (comment[0].likes.includes(userId)) {
      return res.json({ msg: "You can not like a comment twice" });
    }

    const artisan = await Artisan.findOneAndUpdate(
      {
        "comments.commentId": commentId,
      },
      {
        $push: {
          "comments.$.likes": userId,
        },
      },
      { new: true, runValidators: true }
    );
    res.json({ msg: "you liked a comment" });
  } catch (error) {
    next(error);
  }
};

// Unlike  comment
const unLike = async (req, res) => {
  const { commentId, userId } = req.params;
  const artisan = await Artisan.findOneAndUpdate(
    { "comments.commentId": commentId },
    {
      $pull: {
        "comments.$.likes": userId,
      },
    },
    { new: true, runValidators: true }
  );
  res.json({ msg: "you unliked a comment" });
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
  res.json({ message: "Rating added successfully" });
};

module.exports = {
  getAllUsers,
  addComment,
  addLikes,
  unLike,
  addrating,
};
