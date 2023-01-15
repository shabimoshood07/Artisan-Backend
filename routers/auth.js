const express = require("express");
const { artisanSignUp, userSignUp, login} = require("../controllers/auth");
const upload = require("../multer");
const router = express.Router();

router.post("/signup/artisan", upload.single("profileImage"), artisanSignUp);
router.post("/signup/user", userSignUp);
router.post("/login", login);

module.exports = router;
