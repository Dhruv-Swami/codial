const passport = require("passport");
const localStratey = require("passport-local").Strategy;
const User = require("../models/userModel");
// authentication using passport
passport.use(
  new localStratey(
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

// serializing
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserializing
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      console.log("error in finding user --> passport");
      return done(err);
    }
    return done(null, user);
  });
});

module.exports = passport;
