const express = require("express");
const {
  addComment,
  getAllUsers,
  addLikes,
  unLike,
} = require("../controllers/user");
const router = express.Router();

router.get("/", getAllUsers);
router.post("/comment/:artisanId/:userId", addComment);
router.put("/likes/:artisanId/:commentId/:userId", addLikes);

module.exports = router;
