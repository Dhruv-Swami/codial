const Post = require("../models/postModel");

exports.create = async (req, res) => {
  console.log("User object in request:", req.user);

  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id, // Assuming req.user._id is the ObjectId of the user
    });

    return res.redirect("back");
  } catch (err) {
    console.error("Error in creating a post:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
