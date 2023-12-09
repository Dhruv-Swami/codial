const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/userController");

router.get("/profile", usersController.profile);

router.get("/signUp", usersController.signUp);
router.get("/signIn", usersController.signIn);

router.post("/create", usersController.create);

router.post(
  "/create-session",
  // passport.authenticate("local", { failureRedirect: "/users/signIn" }),

  usersController.createSession
);

router.get("/signOut", usersController.destroySession);

module.exports = router;
