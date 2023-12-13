const User = require("../models/userModel");

exports.profile = async (req, res) => {
  try {
    if (req.cookies.user_id) {
      console.log("Cookie Value:", req.cookies.user_id);

      const user = await User.findById(req.cookies.user_id);
      if (user) {
        return res.render("userProfile", {
          title: "User Profile",
          user: user,
        });
      }
      res.redirect("/users/signIn");
    } else {
      res.redirect("/users/signUp");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.signUp = (req, res) => {
  return res.render("userSignUp", {
    title: "Codial | Sign Up",
  });
};

exports.signIn = (req, res) => {
  console.log("User:", req.user);

  return res.render("userSignIn", {
    title: "Codial | Sign In",
  });
};

// exports.create = function (req, res) {
//   if (req.body.password != req.body.confirm_password) {
//     return res.redirect("back");
//   }

//   User.findOne({ email: req.body.email }, function (err, user) {
//     if (err) {
//       console.log("error in finding user in signing up");
//       return;
//     }

//     if (!user) {
//       User.create(req.body, function (err, user) {
//         if (err) {
//           console.log("error in creating user while signing up");
//           return;
//         }

//         return res.redirect("/users/signIn");
//       });
//     } else {
//       return res.redirect("back");
//     }
//   });
// };

exports.create = async function (req, res) {
  try {
    if (req.body.password !== req.body.confirm_password) {
      return res.redirect("back");
    }

    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      const newUser = await User.create(req.body);
      return res.redirect("/users/signIn");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.error("Error in user creation:", err);
    return res.status(500).send("Internal Server Error");
  }
};

// sign in and create a session for the user

exports.createSession = async function (req, res) {
  try {
    // Find the user
    const user = await User.findOne({ email: req.body.email }).exec();

    if (user) {
      // Compare passwords
      if (user.password === req.body.password) {
        // Create session and set user_id cookie
        res.cookie("user_id", user.id);
        return res.redirect("/");
      } else {
        console.log("Password doesn't match");
        return res.redirect("back");
      }
    } else {
      console.log("User not found");
      return res.redirect("back");
    }
  } catch (err) {
    console.error("Error in creating session:", err);
    return res.status(500).send("Internal Server Error");
  }
};

// exports.createSession = (req, res) => {
//   res.redirect("/");
// };

exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.error(err);
    }
    res.redirect("/");
  });
};
