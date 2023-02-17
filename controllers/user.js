const User = require("../models/user");
const Artisan = require("../models/artisan");

// Get all users
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

// Add comment
const addComment = async (req, res, next) => {
  const { artisanId } = req.params;
  let commentBy;

  try {
    if (req.user) {
      const user = await User.findById(req.user.userId);
      commentBy = user.username;
    } else if (req.artisan) {
      if (req.artisan.artisanId == artisanId) {
        const error = new Error("You can not leave a comment on your page");
        error.statusCode = 405;
        throw error;
      }
      const artisan = await Artisan.findById(req.artisan.artisanId);
      commentBy = artisan.businessName;
    }

    const artisan = await Artisan.findByIdAndUpdate(
      { _id: artisanId },
      { $addToSet: { comments: { ...req.body, createdBy: commentBy } } },
      { new: true, runValidators: true }
    );
    res.status(200).json({ msg: "comment sent successfuly" });
  } catch (error) {
    next(error);
  }
};

// merger like and unlike routes by using toggles

// Like comment
const addLikes = async (req, res, next) => {
  const { commentId } = req.params;
  let likeById;

  if (req.user) {
    likeById = req.user.userId;
  } else if (req.artisan) {
    likeById = req.artisan.artisanId;
  }

  try {
    const findArtisan = await Artisan.findOne({
      "comments.commentId": commentId,
    });

    if (!findArtisan) {
      throw new Error("No Artisan Found");
    }

    if (findArtisan._id == likeById) {
      throw new Error("You can not like a comment on your page");
    }
    const comment = findArtisan.comments.filter(
      (comm) => comm.commentId == commentId
    );

    if (!comment) {
      throw new Error("No comment found");
    }

    if (comment[0].likes.includes(likeById)) {
      return res.status(405).json({ msg: "You can not like a comment twice" });
    }

    const artisan = await Artisan.findOneAndUpdate(
      {
        "comments.commentId": commentId,
      },
      {
        $push: {
          "comments.$.likes": likeById,
        },
      },
      { new: true, runValidators: true }
    );
    res.status(200).json({ msg: "you liked a comment" });
    if (!artisan) {
      throw new Error("No Artisan found");
    }
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
