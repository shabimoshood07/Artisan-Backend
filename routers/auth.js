const express = require("express");
const {
  artisanSignUp,
  userSignUp,
  login,
  updateProfile,
  changePassword,
} = require("../controllers/auth");
const auth = require("../middlewares/authentication");
const router = express.Router();

router.post("/signup/artisan", artisanSignUp);
router.post("/signup/user", userSignUp);
router.post("/login", login);
router.patch("/updateprofile", auth, updateProfile);
router.patch("/changepassword", auth, changePassword);
module.exports = router;
