const express = require("express");
const {
  getAllArtisan,
  getArtisan,
  readComment,
  getComment,
  getAllComments,
  getRatings,
  getArtisansBySearch,
  getfeaturedArtisans,
} = require("../controllers/artisan");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.get("/", getAllArtisan);
router.get("/search",authentication, getArtisansBySearch);
router.get("/featured", getfeaturedArtisans);
router.get("/:id", getArtisan);
router.get("/comments/:artisanId", getAllComments);
router.get("/comment/:artisanId/:commentId", getComment);
router.patch("/readcomment/:artisanId/:commentId", readComment);
router.get("/ratings/:artisanId", getRatings);

module.exports = router;
