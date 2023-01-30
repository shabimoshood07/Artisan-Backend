const Artisan = require("../models/artisan");

const getAllArtisan = async (req, res) => {
  const artisans = await Artisan.find({});

  res.status(200).json(artisans);
};

const getArtisan = async (req, res) => {
  const { id } = req.params;
  const artisan = await Artisan.findById({ _id: id }).select("-password");

  res.status(200).json(artisan);
};

// Get a comment
const getComment = async (req, res) => {
  const { artisanId, commentId } = req.params;

  const { comments } = await Artisan.findOne({ _id: artisanId }).select(
    "comments"
  );
  const comment = comments.find((comment) => comment.commentId == commentId);
  res.json(comment);
};

// Get all comments
const getAllComments = async (req, res) => {
  const { artisanId } = req.params;

  const artisan = await Artisan.findOne({ _id: artisanId });
  res.json({
    comments: artisan.comments,
    commentCount: artisan.commentCount,
    unreadCount: artisan.unreadCount,
  });
};

// Read Comment
const readComment = async (req, res) => {
  const { artisanId, commentId } = req.params;

  const artisan = await Artisan.findOneAndUpdate(
    {
      "comments.commentId": commentId,
    },
    { $set: { "comments.$[elem].read": true } },
    {
      arrayFilters: [{ "elem.commentId": commentId }],
      new: true,
      runValidators: true,
    }
  );

  res.json({ message: "comment read!" });
};
module.exports = {
  getAllArtisan,
  getArtisan,
  getComment,
  getAllComments,
  readComment,
};
