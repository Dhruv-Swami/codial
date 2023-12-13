// const passport = require("passport");
// const localStratey = require("passport-local").Strategy;
// const User = require("../models/userModel");
// // authentication using passport

// passport.use(
//   new localStratey(
//     {
//       usernameField: "email",
//     },
//     (email, password, done) => {
//       User.findOne({ email: email }, (err, user) => {
//         if (err) {
//           console.log("error in finding user --> passport");
//           return done(err);
//         }
//         if (!user || user.password != password) {
//           console.log("invalid username/password ");
//           return done(null, false);
//         }
//         return done(null, user);
//       });
//     }
//   )
// );

// // serializing
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// // deserializing
// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     if (err) {
//       console.log("error in finding user --> passport");
//       return done(err);
//     }
//     return done(null, user);
//   });
// });

// // passport.checkAuthentication = function (req, res, next) {
// //   if (req.isAuthenticated()) {
// //     return next();
// //   }
// //   return res.redirect("/users/signIn");
// // };

// // passport.setAuthenticatedUser = function (req, res, next) {
// //   if (req.isAuthenticated()) {
// //     res.locals.user = req.user;
// //   }
// //   next();
// // };

// passport.checkAuthentication = function (req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }

//   // For regular web requests
//   res.redirect("/users/signIn");

//   // For API requests
//   // res.status(401).json({ error: "User not authenticated" });
// };

// passport.setAuthenticatedUser = function (req, res, next) {
//   if (req.isAuthenticated()) {
//     // Make the authenticated user available in the views
//     res.locals.user = req.user;
//   }
//   next();
// };

// module.exports = passport;

const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/userModel");

passport.use(
  new localStrategy(
    {
      usernameField: "email",
    },
    (email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          console.log("error in finding user --> passport");
          return done(err);
        }
        if (!user || user.password != password) {
          console.log("invalid username/password ");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      console.log("error in finding user --> passport");
      return done(err);
    }
    return done(null, user);
  });
});

passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/users/signIn");

  res.status(401).json({ error: "User not authenticated" });
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // Make the authenticated user available in the views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
