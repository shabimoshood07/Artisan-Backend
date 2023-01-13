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
    { $addToSet: { comments: { ...req.body, createdBy: user.username } } },
    { new: true, runValidators: true }
  );
  res.json(artisan);
};

const addLikes = async (req, res) => {
  const { artisanId, commentId, userId } = req.params;

  // const artisan = await Artisan.findById(artisanId);

  // const comment = await artisan.comments.find( commentId);

  // res.json({ comment });

  const artisan = await Artisan.findOneAndUpdate(
    { "_id": artisanId, "comments._id": commentId },
    {
      "$set": {
        "comments.$.likes": userId,
      },
    },
    { runValidators: true }
  );

  // if (!user) {
  //   res.status(404).json({ message: `No user found with this id: ${userId}!` });
  // }
  res.json(artisan);
};

module.exports = { getAllUsers, addComment, addLikes };
