const express = require("express");
const { signUp } = require("../controllers/auth");
const upload = require("../multer")
const router = express.Router();

router.post("/signup",upload.single("profileImage"), signUp);

module.exports = router;
