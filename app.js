// const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 5000;
const homeRoute = require("./routes/route");
const userRoute = require("./routes/userRoute");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
// used for passport cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local");
// const MongoStore = require("connect-mongo").default;

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static("./assets"));

app.use(expressLayouts);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", "./views");

// mongo store is used to store session cookie in db

app.use(
  session({
    name: "codeial",
    // TODO change the secret before deployment in production mode
    secret: "hunters",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use("/", homeRoute);
app.use("/users", userRoute);

app.listen(port, (err) => {
  if (err) {
    console.log(`error in running server ${err}`);
  }
  console.log(`app is running on port ${port}`);
});
