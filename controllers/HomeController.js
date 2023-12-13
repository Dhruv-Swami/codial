const Post = require("../models/postModel");

exports.home = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("user").exec();

    return res.render("home", {
      title: "Codeial | Home",
      posts: posts,
    });
  } catch (err) {
    console.error("Error in retrieving posts:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
