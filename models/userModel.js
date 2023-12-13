const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    _id: mongoose.Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  // Your pre-save hook logic (if any)
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
