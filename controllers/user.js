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
  // const artisan = await Artisan.findById(artisanId);

  const artisan = await Artisan.findByIdAndUpdate(
    { _id: artisanId },
    { $addToSet: { comments: { ...req.body, createdBy: user.username } } },
    { new: true, runValidators: true }
  );
  res.json({ msg: "comment sent successfuly" });
};

// Like comment
const addLikes = async (req, res) => {
  const { commentId, userId } = req.params;

  const findArtisan = await Artisan.findOne({
    "comments.commentId": commentId,
  });

  const comment = await findArtisan.comments.filter(
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
  res.json(artisan);
};

// Get comment
const getComment = async (req, res) => {
  const { artisanId, commentId } = req.params;

  const { comments } = await Artisan.findOne({ _id: artisanId }).select(
    "comments"
  );
  const comment = comments.find((comment) => comment.commentId == commentId);
  res.json(comment);
};

const readComment = async (req, res) => {
  const { artisanId, commentId } = req.params;
  const body = true;
  const comments = await Artisan.findOne(
    {
      "comments.commentId": commentId,
    },
    { $set: [{ $getField: "comments.read" }, true] },

    // { $gt: [ { $getField: "price.usd" }, 200 ] }
    { arrayFilters: [{ $getField: "comments.commentId" }, commentId] }
    // {
    //   $set: {
    //     "comments.$.read": true,
    //   },
    // }
  );

  // ({ _id: 1 },
  //   { $set: { "grades.$[elem].mean": 100 } },
  //   { arrayFilters: [{ "elem.grade": { $gte: 85 } }] });

  // ({ "products.productCode": userData.productCode },
  //   { $set: { "products.$": dataToBeUpdated } });

  // const doc = await Artisan.comments.id(commentId);

  res.json(comments);
};

module.exports = {
  getAllUsers,
  addComment,
  addLikes,
  unLike,
  addrating,
  getComment,
  readComment,
};
