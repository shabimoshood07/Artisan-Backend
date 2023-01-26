const express = require("express");
const {
  addComment,
  getAllUsers,
  addLikes,
  unLike,
  addrating,
  getComment
} = require("../controllers/user");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/comment/:artisanId/:commentId", getComment);
router.post("/comment/:artisanId/:userId", addComment);
router.patch("/rating/:artisanId/:userId", addrating);
router.patch("/like/:commentId/:userId", addLikes);
router.patch("/unlike/:commentId/:userId", unLike);

module.exports = router;
