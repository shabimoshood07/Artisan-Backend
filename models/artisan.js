const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var uniqueValidator = require("mongoose-unique-validator");
var mongooseTypePhone = require("mongoose-type-phone");
const commentSchema = require("./comment");
const ratingSchema = require("./rating");

const artisanSchema = new mongoose.Schema(
  {
    phoneNumber: {
      unique: "Phone number already exists",
      type: mongoose.SchemaTypes.Phone,
      required: "Please provide phone number",
      allowBlank: false,
      allowedNumberTypes: [
        mongooseTypePhone.PhoneNumberType.MOBILE,
        mongooseTypePhone.PhoneNumberType.FIXED_LINE_OR_MOBILE,
      ],
      phoneNumberFormat: mongooseTypePhone.PhoneNumberFormat.INTERNATIONAL,
      defaultRegion: "NG",
      parseOnGet: false,
    },
    name: {
      type: String,
      required: [true, "Please provide name"],
      maxlength: 50,
      minlength: 3,
    },
    role: {
      type: String,
      default: "artisan",
      required: true,
    },
    businessName: {
      type: String,
      required: [true, "Please provide business name"],
      unique: "Business name already exists",
      // unique: [true, "business name already exists"],
      maxlength: 50,
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: "Email already exists",
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: [6, "Password should be at least six characters"],
    },
    address: {
      type: String,
      required: [true, "Please provide address"],
    },

    profession: {
      type: String,
      required: [true, "Please provide profession"],
    },
    gender: {
      type: String,
      required: [true, "Please select  gender"],
      enum: ["male", "female"],
    },
    socials: {
      facebook: {
        type: String,
        default: "#",
      },
      instagram: {
        type: String,
        default: "#",
      },
      twitter: {
        type: String,
        default: "#",
      },
    },
    about: {
      type: String,
      maxlength: 5000,
      default: "",
    },
    profileImage: {
      type: String,
      default:"https://res.cloudinary.com/xabi007/image/upload/v1644484061/profileImage/avatar-g2b4feb965_1280_qbyhur.pngF"
    },
    comments: [commentSchema],
    ratings: [ratingSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// comment count
artisanSchema.virtual("commentCount").get(function () {
  if (this.comments) {
    return this.comments.length;
  }
});

// rating count
artisanSchema.virtual("ratingsCount").get(function () {
  if (this.ratings) {
    return this.ratings.length;
  }
  return;
});

// Rating
artisanSchema.virtual("rating").get(function () {
  let total = 0;
  if (this.ratings) {
    if (this.ratings.length == 0) {
      return null;
    }

    this.ratings.map((rate) => (total += rate.ratingValue));
    return (total / this.ratings.length).toFixed(1);
  }
  return;
});

// Unread count
artisanSchema.virtual("unreadCount").get(function () {
  if (this.comments) {
    const unreadcomments = this.comments.filter((comm) => comm.read === false);
    return unreadcomments.length;
  }
  return;
});

// hash password
artisanSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// create JWT
artisanSchema.methods.createJWT = function () {
  return jwt.sign(
    { artisanId: this._id, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

// compare password
artisanSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

// Unique Validator
artisanSchema.plugin(uniqueValidator, {
  message: "{PATH} already exist",
});

module.exports = mongoose.model("Artisan", artisanSchema);
