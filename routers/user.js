const express = require("express");
const {
  addComment,
  getAllUsers,
  addLikes,
  unLike,
  addrating,
  getComment,
  readComment
} = require("../controllers/user");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/comment/:artisanId/:commentId", getComment);
router.post("/comment/:artisanId/:userId", addComment);
router.patch("/rating/:artisanId/:userId", addrating);
router.patch("/like/:commentId/:userId", addLikes);
router.patch("/unlike/:commentId/:userId", unLike);
router.patch("/readcomment/:artisanId/:commentId", readComment);

module.exports = router;
