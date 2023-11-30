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

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static("./assets"));

app.use(expressLayouts);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use("/", homeRoute);
app.use("/users", userRoute);

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "codial",
    secret: "hunters",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

app.listen(port, (err) => {
  if (err) {
    console.log(`error in running server ${err}`);
  }
  console.log(`app is running on port ${port}`);
});
