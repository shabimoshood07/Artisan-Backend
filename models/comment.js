// reaction schema

const { Schema, Types } = require("mongoose");

const commentSchema = new Schema(
  {
    // set custom id
    commentId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    commentText: {
      type: String,
      required: true,
      maxlength: 500,
    },
    createdBy: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      WritableStream:true
    },
    read: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// likes count
commentSchema.virtual("likesCount").get(function () {
  return this.likes.length;
});

module.exports = commentSchema;
