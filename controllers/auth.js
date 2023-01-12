const Artisan = require("../models/artisan");
const upload = require("../multer");
const fs = require("fs");
const path = require("path");

const signUp = async (req, res) => {
  const artisan = await Artisan.create({
    ...req.body,
  });

  const token = artisan.createJWT();

  res.status(201).json({ artisan: { artisan }, token });
};

module.exports = { signUp };
