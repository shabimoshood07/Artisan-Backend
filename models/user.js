const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var uniqueValidator = require("mongoose-unique-validator");
var mongooseTypePhone = require("mongoose-type-phone");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },
  role: {
    type: String,
    default: "user",
    required: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: [6, "Password should be at least six characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    // unique: true,
  },
});

// hash password
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// create JWT
userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

// compare password
userSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

// Unique Validator
// artisanSchema.plugin(uniqueValidator, {
//   message: "{PATH} already exist",
// });

module.exports = mongoose.model("User", userSchema);
