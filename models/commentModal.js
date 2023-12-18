const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // Assuming "Pser" was a typo and you meant "Post"
    },
  },
  { timestamps: true }
);

// Use mongoose.model() instead of mongoose.Model()
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
