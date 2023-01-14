const express = require("express");
const {
  addComment,
  getAllUsers,
  addLikes,
  unLike,
  addrating
} = require("../controllers/user");
const router = express.Router();

router.get("/", getAllUsers);
router.post("/comment/:artisanId/:userId", addComment);
router.post("/rating/:artisanId/:userId", addrating);
router.put("/like/:artisanId/:commentId/:userId", addLikes);
router.put("/unlike/:artisanId/:commentId/:userId", unLike);

module.exports = router;
