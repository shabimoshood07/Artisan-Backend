const express = require("express");
const { artisanSignUp, userSignUp } = require("../controllers/auth");
const upload = require("../multer");
const router = express.Router();

router.post("/signup/artisan", upload.single("profileImage"), artisanSignUp);
router.post("/signup/user", userSignUp);

module.exports = router;
