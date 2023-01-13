const express = require("express");
const { addComment, getAllUsers, addLikes} = require("../controllers/user");
const router = express.Router();

router.post("/comment/:artisanId/:userId", addComment);
router.post("/likes/:artisanId/:commentId/:userId", addLikes);

module.exports = router;
