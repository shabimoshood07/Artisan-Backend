const Artisan = require("../models/artisan");
const User = require("../models/user");
const upload = require("../multer");
const fs = require("fs");
const path = require("path");

const artisanSignUp = async (req, res) => {
  const artisan = await Artisan.create({
    ...req.body,
  });

  const token = artisan.createJWT();

  res.status(201).json({ artisan: { artisan }, token });
};

const userSignUp = async (req, res) => {
  const user = await User.create({
    ...req.body,
  });

  const token = user.createJWT();

  res.status(201).json({ user, token });
};

module.exports = { artisanSignUp, userSignUp };
