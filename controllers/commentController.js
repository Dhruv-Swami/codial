const Comment = require("../models/commentModal");
const Post = require("../models/postModel");

exports.create = (req, res) => {
  Post.findById(req.body.post, (err, post) => {
    if (post) {
      Comment.create(
        {
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        },
        (err, comment) => {
          post.comments.push(comment); // Use 'comment' instead of 'Comment'
          post.save();

          res.redirect("/");
        }
      );
    }
  });
};
