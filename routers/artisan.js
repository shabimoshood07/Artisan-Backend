const express = require("express");
const {
  getAllArtisan,
  getArtisan,
  readComment,
  getComment,
  getAllComments,
} = require("../controllers/artisan");
const router = express.Router();

router.get("/", getAllArtisan);
router.get("/:id", getArtisan);
router.get("/comment/:artisanId/:commentId", getComment);
router.get("/comments/:artisanId", getAllComments);
router.patch("/readcomment/:artisanId/:commentId", readComment);

module.exports = router;
