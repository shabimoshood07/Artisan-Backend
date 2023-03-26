const Artisan = require("../models/artisan");
const User = require("../models/user");

const artisanSignUp = async (req, res, next) => {
  console.log(req.body.email);
  const artisanExists = await Artisan.findOne({ email: req.body.email });
  if (artisanExists) {
    return res.status(401).json({
      message:
        "Sorry, this email is already taken. Please use a different email or try logging in",
    });
  } else {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(401).json({
        message:
          "Sorry, this email is already taken. Please use a different email or try logging in",
      });
    }
  }

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

const userSignUp = async (req, res, next) => {
  const artisanExists = await Artisan.findOne({ email: req.body.email });
  if (artisanExists) {
    return res.status(401).json({
      message:
        "Sorry, this email is already taken. Please use a different email or try logging in",
    });
  } else {
    const userExists = await Artisan.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(401).json({
        message:
          "Sorry, this email is already taken. Please use a different email or try logging in",
      });
    }
  }
  try {
    const user = await User.create({
      ...req.body,
    });

    const token = user.createJWT();

    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  const { data, password } = req.body;
  const artisan = await Artisan.findOne({ email: data });

  if (!artisan) {
    const user = await User.findOne({ username: data });
    if (!user) return res.status(403).json({ message: "Invalid credentials" });
    const passwordCheck = await user.comparePassword(password);
    if (!passwordCheck) {
      return res.status(401).json({ message: "invalid credentials" });
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
  const passwordCheck = await artisan.comparePassword(password);

  if (!passwordCheck) {
    return res.status(401).json({ message: "invalid credentials" });
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

const updateProfile = async (req, res) => {
  if (req.artisan) {
    const updatedArtisan = await Artisan.findOneAndUpdate(
      {
        _id: req.artisan.artisanId,
      },
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!updatedArtisan)
      return res.status(500).json({ message: "something went wrong" });
    res.status(200).json({ message: "profile updated successfully" });
  }
  if (req.user) {
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: req.user.userId,
      },
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!updatedUser)
      return res.status(500).json({ message: "something went wrong" });
    res.status(200).json({ message: "profile updated successfully" });
  }
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword)
    return res
      .status(400)
      .json({ message: "Enter your current password and new password" });
  if (req.artisan) {
    const artisan = await Artisan.findOne({ _id: req.artisan.artisanId });
    if (!artisan) return res.status(404).json({ message: "No artisan found" });

    const passwordCheck = await artisan.comparePassword(currentPassword);
    if (!passwordCheck)
      return res.status(401).json({ message: "Inavlid credentials" });

    const updatedArtisan = await Artisan.findOneAndUpdate(
      { _id: req.artisan.artisanId },
      {
        password: newPassword,
      },
      { new: true, runValidators: true }
    );

    await updatedArtisan.save();
    res.status(200).json({ message: "Password updated successfully " });
  }
  if (req.user) {
    const user = await User.findOne({ _id: req.user.userId });
    if (!user) return res.status(404).json({ message: "No user found" });

    const passwordCheck = await user.comparePassword(currentPassword);
    if (!passwordCheck)
      return res.status(401).json({ message: "Inavlid credentials" });

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.artisan.artisanId },
      {
        password: newPassword,
      },
      { new: true, runValidators: true }
    );

    await updatedUser.save();
    res.status(200).json({ message: "Password updated successfully " });
  }
};

module.exports = {
  artisanSignUp,
  userSignUp,
  login,
  updateProfile,
  changePassword,
};
