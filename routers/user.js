const express = require("express");
const authentication = require("../middlewares/authentication");
const {
  addComment,
  getAllUsers,
  addLikes,
  unLike,
  addrating,
  getComment,
  getAllComments,
} = require("../controllers/user");
const router = express.Router();

router.get("/", getAllUsers);
router.post("/comment/:artisanId/:userId", authentication, addComment);
router.patch("/rating/:artisanId/:userId", authentication, addrating);
router.patch("/like/:commentId/:userId", authentication, addLikes);
router.patch("/unlike/:commentId/:userId", authentication, unLike);

module.exports = router;
