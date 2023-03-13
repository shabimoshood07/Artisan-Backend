// reaction schema

const { Schema, Types } = require("mongoose");

const ratingSchema = new Schema(
  {
    // set custom id
    ratingId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    ratingValue: {
      type: Number,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);


module.exports = ratingSchema;
