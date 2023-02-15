const Artisan = require("../models/artisan");
const User = require("../models/user");
const upload = require("../multer");
const fs = require("fs");
const path = require("path");

const artisanSignUp = async (req, res, next) => {
  try {
    const artisan = await Artisan.create({
      ...req.body,
    });

    const token = artisan.createJWT();

    res.status(201).json({ artisan: { artisan }, token });
  } catch (error) {
    next(error);
  }
};

const userSignUp = async (req, res) => {
  const user = await User.create({
    ...req.body,
  });

  const token = user.createJWT();

  res.status(201).json({ user, token });
};

const login = async (req, res) => {
  const { data, password } = req.body;
  const artisan = await Artisan.findOne({ email: data });

  if (!artisan) {
    const user = await User.findOne({ username: data });
    const passwordCheck = user.comparePassword(password);
    if (!passwordCheck) {
      return res.status(401).json({ msg: "invalid credentials" });
    }
    const token = user.createJWT();
    return res.json({
      username: user.username,
      email: user.email,
      role: user.role,
      token: token,
      id: user._id,
    });
  }
  const passwordCheck = artisan.comparePassword(password);

  if (!passwordCheck) {
    return res.status(401).json({ msg: "invalid credentials" });
  }
  const token = artisan.createJWT();
  res.json({
    name: artisan.name,
    email: artisan.email,
    role: artisan.role,
    token: token,
    id: artisan._id,
  });
};

module.exports = { artisanSignUp, userSignUp, login };
