const express = require("express");
const {
  getAllArtisan,
  getArtisan,
  readComment,
  getComment,
  getAllComments,
  getRatings
} = require("../controllers/artisan");
const router = express.Router();

router.get("/", getAllArtisan);
router.get("/:id", getArtisan);
router.get("/comment/:artisanId/:commentId", getComment);
router.get("/comments/:artisanId", getAllComments);
router.patch("/readcomment/:artisanId/:commentId", readComment);
router.get("/ratings/:artisanId", getRatings);

module.exports = router;
