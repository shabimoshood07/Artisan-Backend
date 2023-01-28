const express = require("express");
const {
  getAllArtisan,
  getArtisan,
  readComment,
} = require("../controllers/artisan");
const router = express.Router();

router.get("/", getAllArtisan);
router.get("/:id", getArtisan);
router.patch("/readcomment/:artisanId/:commentId", readComment);

module.exports = router;
