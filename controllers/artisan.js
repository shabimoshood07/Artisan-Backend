const Artisan = require("../models/artisan");

// GET ALL ARTISAN
const getAllArtisan = async (req, res) => {
  const artisans = await Artisan.find({});

  res.status(200).json(artisans);
};

// GET ARTISAN
const getArtisan = async (req, res, next) => {
  const { id } = req.params;

  try {
    const artisan = await Artisan.findById({ _id: id }).select("-password");
    if (!artisan) {
      // return res.status(404).json({ message: "No artisan found" });
      res.status(404);
      throw new Error("No Artisan found");
    }
    res.status(200).json(artisan);
  } catch (error) {
    next(error);
  }
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
  const { commentId } = req.params;

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

// GET RATINGS

const getRatings = async (req, res) => {
  const { artisanId } = req.params;
  const ratings = await Artisan.findOne({ _id: artisanId }).select(
    "ratings ratingsCount rating"
  );
  res.json(ratings);
};

// get Artisan by search

const getArtisansBySearch = async (req, res) => {
  const { location, profession, page } = req.query;
  const LIMIT = 10;

  const artisans = await Artisan.find({
    address: { $regex: location, $options: "i" },
    profession: { $regex: profession, $options: "i" },
  })
    .select("-password  -comments")
    .exec();

  artisans.sort((a, b) => b.rating - a.rating);

  const startIndex = (Number(page) - 1) * LIMIT;
  const endIndex = startIndex + LIMIT;
  const results = artisans.slice(startIndex, endIndex);

  res.status(200).json({
    artisans: results,
    currentPage: Number(page),
    numberOfPages: Math.ceil(artisans.length / LIMIT),
  });

  // const LIMIT = 10;
  // const startIndex = (Number(page) - 1) * LIMIT;
  // // get the starting index of every page

  // const artisans = await Artisan.find({
  //   address: { $regex: location, $options: "i" },
  //   profession: { $regex: profession, $options: "i" },
  // })
  //   .sort({ rating: 1 })
  //   .select("-password  -comments")
  //   .limit(LIMIT)
  //   .skip(startIndex);

  // if (!artisans) res.status(200).json({ message: "No artisan found" });

  // const total = await Artisan.countDocuments({});
  // res.status(200).json({
  //   artisans: artisans,
  //   currentPage: Number(page),
  //   numberOfPages: Math.ceil(total / LIMIT),
  // });
};

// Get Feature Artisans
const getfeaturedArtisans = async (req, res) => {
  const artisans = await Artisan.find({}).select("-password -comments ");
  if (!artisans) res.status(200).json({ message: "No artisan found" });

  res.status(200).json(artisans);
};

const deleteArtisan = async (req, res) => {};
module.exports = {
  getAllArtisan,
  getArtisan,
  getComment,
  getAllComments,
  readComment,
  getRatings,
  getArtisansBySearch,
  getfeaturedArtisans,
  deleteArtisan,
};
