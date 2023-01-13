const express = require("express");
const { addComment, getAllUsers } = require("../controllers/user");
const router = express.Router();

router.post("/comment/:artisanId/:userId", addComment);

module.exports = router;
